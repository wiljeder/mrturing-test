/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as RegisterImport } from './routes/register'
import { Route as LoginImport } from './routes/login'
import { Route as DashboardLayoutImport } from './routes/_dashboardLayout'
import { Route as DashboardLayoutIndexImport } from './routes/_dashboardLayout/index'
import { Route as DashboardLayoutUsersRouteImport } from './routes/_dashboardLayout/users/route'
import { Route as DashboardLayoutOrganizationsRouteImport } from './routes/_dashboardLayout/organizations/route'
import { Route as DashboardLayoutOrganizationsIndexImport } from './routes/_dashboardLayout/organizations/index'
import { Route as DashboardLayoutOrganizationsOrgIdImport } from './routes/_dashboardLayout/organizations/$orgId'

// Create/Update Routes

const RegisterRoute = RegisterImport.update({
  id: '/register',
  path: '/register',
  getParentRoute: () => rootRoute,
} as any)

const LoginRoute = LoginImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const DashboardLayoutRoute = DashboardLayoutImport.update({
  id: '/_dashboardLayout',
  getParentRoute: () => rootRoute,
} as any)

const DashboardLayoutIndexRoute = DashboardLayoutIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => DashboardLayoutRoute,
} as any)

const DashboardLayoutUsersRouteRoute = DashboardLayoutUsersRouteImport.update({
  id: '/users',
  path: '/users',
  getParentRoute: () => DashboardLayoutRoute,
} as any)

const DashboardLayoutOrganizationsRouteRoute =
  DashboardLayoutOrganizationsRouteImport.update({
    id: '/organizations',
    path: '/organizations',
    getParentRoute: () => DashboardLayoutRoute,
  } as any)

const DashboardLayoutOrganizationsIndexRoute =
  DashboardLayoutOrganizationsIndexImport.update({
    id: '/',
    path: '/',
    getParentRoute: () => DashboardLayoutOrganizationsRouteRoute,
  } as any)

const DashboardLayoutOrganizationsOrgIdRoute =
  DashboardLayoutOrganizationsOrgIdImport.update({
    id: '/$orgId',
    path: '/$orgId',
    getParentRoute: () => DashboardLayoutOrganizationsRouteRoute,
  } as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_dashboardLayout': {
      id: '/_dashboardLayout'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof DashboardLayoutImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginImport
      parentRoute: typeof rootRoute
    }
    '/register': {
      id: '/register'
      path: '/register'
      fullPath: '/register'
      preLoaderRoute: typeof RegisterImport
      parentRoute: typeof rootRoute
    }
    '/_dashboardLayout/organizations': {
      id: '/_dashboardLayout/organizations'
      path: '/organizations'
      fullPath: '/organizations'
      preLoaderRoute: typeof DashboardLayoutOrganizationsRouteImport
      parentRoute: typeof DashboardLayoutImport
    }
    '/_dashboardLayout/users': {
      id: '/_dashboardLayout/users'
      path: '/users'
      fullPath: '/users'
      preLoaderRoute: typeof DashboardLayoutUsersRouteImport
      parentRoute: typeof DashboardLayoutImport
    }
    '/_dashboardLayout/': {
      id: '/_dashboardLayout/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof DashboardLayoutIndexImport
      parentRoute: typeof DashboardLayoutImport
    }
    '/_dashboardLayout/organizations/$orgId': {
      id: '/_dashboardLayout/organizations/$orgId'
      path: '/$orgId'
      fullPath: '/organizations/$orgId'
      preLoaderRoute: typeof DashboardLayoutOrganizationsOrgIdImport
      parentRoute: typeof DashboardLayoutOrganizationsRouteImport
    }
    '/_dashboardLayout/organizations/': {
      id: '/_dashboardLayout/organizations/'
      path: '/'
      fullPath: '/organizations/'
      preLoaderRoute: typeof DashboardLayoutOrganizationsIndexImport
      parentRoute: typeof DashboardLayoutOrganizationsRouteImport
    }
  }
}

// Create and export the route tree

interface DashboardLayoutOrganizationsRouteRouteChildren {
  DashboardLayoutOrganizationsOrgIdRoute: typeof DashboardLayoutOrganizationsOrgIdRoute
  DashboardLayoutOrganizationsIndexRoute: typeof DashboardLayoutOrganizationsIndexRoute
}

const DashboardLayoutOrganizationsRouteRouteChildren: DashboardLayoutOrganizationsRouteRouteChildren =
  {
    DashboardLayoutOrganizationsOrgIdRoute:
      DashboardLayoutOrganizationsOrgIdRoute,
    DashboardLayoutOrganizationsIndexRoute:
      DashboardLayoutOrganizationsIndexRoute,
  }

const DashboardLayoutOrganizationsRouteRouteWithChildren =
  DashboardLayoutOrganizationsRouteRoute._addFileChildren(
    DashboardLayoutOrganizationsRouteRouteChildren,
  )

interface DashboardLayoutRouteChildren {
  DashboardLayoutOrganizationsRouteRoute: typeof DashboardLayoutOrganizationsRouteRouteWithChildren
  DashboardLayoutUsersRouteRoute: typeof DashboardLayoutUsersRouteRoute
  DashboardLayoutIndexRoute: typeof DashboardLayoutIndexRoute
}

const DashboardLayoutRouteChildren: DashboardLayoutRouteChildren = {
  DashboardLayoutOrganizationsRouteRoute:
    DashboardLayoutOrganizationsRouteRouteWithChildren,
  DashboardLayoutUsersRouteRoute: DashboardLayoutUsersRouteRoute,
  DashboardLayoutIndexRoute: DashboardLayoutIndexRoute,
}

const DashboardLayoutRouteWithChildren = DashboardLayoutRoute._addFileChildren(
  DashboardLayoutRouteChildren,
)

export interface FileRoutesByFullPath {
  '': typeof DashboardLayoutRouteWithChildren
  '/login': typeof LoginRoute
  '/register': typeof RegisterRoute
  '/organizations': typeof DashboardLayoutOrganizationsRouteRouteWithChildren
  '/users': typeof DashboardLayoutUsersRouteRoute
  '/': typeof DashboardLayoutIndexRoute
  '/organizations/$orgId': typeof DashboardLayoutOrganizationsOrgIdRoute
  '/organizations/': typeof DashboardLayoutOrganizationsIndexRoute
}

export interface FileRoutesByTo {
  '/login': typeof LoginRoute
  '/register': typeof RegisterRoute
  '/users': typeof DashboardLayoutUsersRouteRoute
  '/': typeof DashboardLayoutIndexRoute
  '/organizations/$orgId': typeof DashboardLayoutOrganizationsOrgIdRoute
  '/organizations': typeof DashboardLayoutOrganizationsIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/_dashboardLayout': typeof DashboardLayoutRouteWithChildren
  '/login': typeof LoginRoute
  '/register': typeof RegisterRoute
  '/_dashboardLayout/organizations': typeof DashboardLayoutOrganizationsRouteRouteWithChildren
  '/_dashboardLayout/users': typeof DashboardLayoutUsersRouteRoute
  '/_dashboardLayout/': typeof DashboardLayoutIndexRoute
  '/_dashboardLayout/organizations/$orgId': typeof DashboardLayoutOrganizationsOrgIdRoute
  '/_dashboardLayout/organizations/': typeof DashboardLayoutOrganizationsIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | ''
    | '/login'
    | '/register'
    | '/organizations'
    | '/users'
    | '/'
    | '/organizations/$orgId'
    | '/organizations/'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/login'
    | '/register'
    | '/users'
    | '/'
    | '/organizations/$orgId'
    | '/organizations'
  id:
    | '__root__'
    | '/_dashboardLayout'
    | '/login'
    | '/register'
    | '/_dashboardLayout/organizations'
    | '/_dashboardLayout/users'
    | '/_dashboardLayout/'
    | '/_dashboardLayout/organizations/$orgId'
    | '/_dashboardLayout/organizations/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  DashboardLayoutRoute: typeof DashboardLayoutRouteWithChildren
  LoginRoute: typeof LoginRoute
  RegisterRoute: typeof RegisterRoute
}

const rootRouteChildren: RootRouteChildren = {
  DashboardLayoutRoute: DashboardLayoutRouteWithChildren,
  LoginRoute: LoginRoute,
  RegisterRoute: RegisterRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/_dashboardLayout",
        "/login",
        "/register"
      ]
    },
    "/_dashboardLayout": {
      "filePath": "_dashboardLayout.tsx",
      "children": [
        "/_dashboardLayout/organizations",
        "/_dashboardLayout/users",
        "/_dashboardLayout/"
      ]
    },
    "/login": {
      "filePath": "login.tsx"
    },
    "/register": {
      "filePath": "register.tsx"
    },
    "/_dashboardLayout/organizations": {
      "filePath": "_dashboardLayout/organizations/route.tsx",
      "parent": "/_dashboardLayout",
      "children": [
        "/_dashboardLayout/organizations/$orgId",
        "/_dashboardLayout/organizations/"
      ]
    },
    "/_dashboardLayout/users": {
      "filePath": "_dashboardLayout/users/route.tsx",
      "parent": "/_dashboardLayout"
    },
    "/_dashboardLayout/": {
      "filePath": "_dashboardLayout/index.tsx",
      "parent": "/_dashboardLayout"
    },
    "/_dashboardLayout/organizations/$orgId": {
      "filePath": "_dashboardLayout/organizations/$orgId.tsx",
      "parent": "/_dashboardLayout/organizations"
    },
    "/_dashboardLayout/organizations/": {
      "filePath": "_dashboardLayout/organizations/index.tsx",
      "parent": "/_dashboardLayout/organizations"
    }
  }
}
ROUTE_MANIFEST_END */
