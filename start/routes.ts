/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

// Auth Routes — Public
Route.post('/register', 'AuthController.register')
Route.post('/login',    'AuthController.login')

// Auth Routes — Protected
Route.post('/logout', 'AuthController.logout').middleware('auth')

// Profile Routes — All Protected
Route.group(() => {
  Route.get(    '/profile', 'ProfilesController.show')
  Route.post(   '/profile', 'ProfilesController.create')
  Route.put(    '/profile', 'ProfilesController.update')
  Route.delete( '/profile', 'ProfilesController.destroy')
}).prefix('/user').middleware('auth')

// Admin Routes — Read (both roles)
Route.group(() => {
  Route.get('/users',     'AdminsController.index')
  Route.get('/users/:id', 'AdminsController.show')
}).prefix('/admin').middleware(['auth', 'role:main_admin,tech_support'])

// Admin Routes — CRUD (main_admin only)
Route.group(() => {
  Route.put(    '/users/:id', 'AdminsController.update')
  Route.delete( '/users/:id', 'AdminsController.destroy')
}).prefix('/admin').middleware(['auth', 'role:main_admin'])