## Express template

Welcome to this template. After creating my MEXN-template I noticed that for the `Express framework` there was no CLI tool that created the express project the way I like to work with it. So here it is!

This project is trying to be as structured as possible, this is confliciting a little bit with the philosophy behind express but in my opinion when using `Express` for bigger applications not structuring your project the right way can get messy before you know it. And refactoring after is no one's favourite passtime.

For using this template knowledge is needed on how to use:

-   NodeJS
-   NPM

For deploying this I recommend also having read some about or researching:

-   Docker

To download
`git clone https://github.com/thebetar/MEXN-template.git`

### Instructions

Like described in the paragraph above this projects tries to make structure within an `Express` application for bigger projects. Within the `src/index.ts` file there are a couple of things to look at.
The project is bootstrapped like a usual `Express` application aside from one function. The `bootstrapControllers` function.
The `bootstrapControllers` function takes in an array of controllers that will get initialised.
This makes it so the declared routes within this controller (see `src/controllers/app.controller.ts` for an example) is listened to by the `express` application.
Furthermore this projects follows the convention of `controllers` declaring routes. `services` handling business logic. And `repositories` handling all the communication with the database.
When connecting to a database it is good to use an ORM, the recommended ORMs I use are:

-   Mongoose (exclusively for MongoDB)
-   Prisma (for all well known databases)

Within these ORMs `models` are declared. This is a kind of type definition for the `document` / `entry` you will provide to the database.

Lastly there is the `utils` folder for utilities and a `middlewares` folder for middleware. These are meant for the things they are meant to in a standard `express` application.

From here on out you are on your own happy programming!
