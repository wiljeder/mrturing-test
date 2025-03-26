import { faker } from "@faker-js/faker";
import { db } from "./index.ts";
import { users, organizations, userOrganizations } from "./schema/index.ts";
import { hashPassword } from "../utils/hashing.ts";

// Configuration
const USERS_COUNT = 25;
const ORGANIZATIONS_COUNT = 100;
const USER_ORGANIZATIONS_MIN = 35;
const USER_ORGANIZATIONS_MAX = 100;

async function seed() {
  console.log("🌱 Starting database seeding...");

  // Clear existing data (optional - comment out if you don't want to clear the DB)
  console.log("Clearing existing data...");
  await db.delete(userOrganizations);
  await db.delete(organizations);
  await db.delete(users);

  // Create users
  console.log(`Creating ${USERS_COUNT} users...`);
  const createdUsers = [];

  // Create one admin user with known credentials for easy testing
  const adminPassword = await hashPassword("123123");
  const adminUser = await db
    .insert(users)
    .values({
      name: "Admin User",
      email: "admin@admin.com",
      password: adminPassword,
    })
    .returning();

  createdUsers.push(adminUser[0]);

  // Create random users
  for (let i = 0; i < USERS_COUNT - 1; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const password = await hashPassword(faker.internet.password());

    const user = await db
      .insert(users)
      .values({
        name: `${firstName} ${lastName}`,
        email: faker.internet.email({ firstName, lastName }).toLowerCase(),
        password: password,
      })
      .returning();

    createdUsers.push(user[0]);
  }

  // Create organizations
  console.log(`Creating ${ORGANIZATIONS_COUNT} organizations...`);
  const createdOrganizations = [];

  for (let i = 0; i < ORGANIZATIONS_COUNT; i++) {
    const randomUserIndex = faker.number.int({
      min: 0,
      max: createdUsers.length - 1,
    });
    const owner = createdUsers[randomUserIndex];

    const organization = await db
      .insert(organizations)
      .values({
        name: faker.company.name(),
        description: faker.company.catchPhrase(),
        ownerId: owner.id,
      })
      .returning();

    createdOrganizations.push(organization[0]);
  }

  // Create user-organization relationships
  console.log("Creating user-organization relationships...");

  for (const user of createdUsers) {
    // Determine how many organizations this user will belong to
    const orgCount = faker.number.int({
      min: USER_ORGANIZATIONS_MIN,
      max: Math.min(USER_ORGANIZATIONS_MAX, ORGANIZATIONS_COUNT),
    });

    // Get random organizations for this user
    const shuffledOrgs = faker.helpers.shuffle([...createdOrganizations]);
    const userOrgs = shuffledOrgs.slice(0, orgCount);

    // Select one random organization to be active
    const activeOrgIndex = faker.number.int({
      min: 0,
      max: userOrgs.length - 1,
    });

    for (let i = 0; i < userOrgs.length; i++) {
      const org = userOrgs[i];

      // If user is the owner, they're automatically active
      // Otherwise, only one organization is active per user
      const isActive = org.ownerId === user.id || i === activeOrgIndex;

      await db
        .insert(userOrganizations)
        .values({
          userId: user.id,
          organizationId: org.id,
          isActive: isActive,
        })
        .onConflictDoNothing();
    }
  }

  console.log("✅ Database seeding completed successfully!");
}

// Run the seed function
seed().catch((e) => {
  console.error("❌ Error seeding database:", e);
  Deno.exit(1);
});
