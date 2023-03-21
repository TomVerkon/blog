# If you ever comeback to this project you will have to a .env file in the client base directory.

# It's content should be as follows:

REACT_APP_BASE_URL=http://localhost
REACT_APP_POST_PORT=4000
REACT_APP_COMMENT_PORT=4001
REACT_APP_QUERY_PORT=4002
REACT_APP_MODERATION_PORT=4003
REACT_APP_EVENTBUS_PORT=4005

REACT_APP_POST_CREATED=PostCreated
REACT_APP_COMMENT_CREATED=CommentCreated
REACT_APP_COMMENT_MODERATED=CommentModerated
REACT_APP_COMMENT_UPDATED=CommentUpdated

Then you have to create a symlink to this file in the base file of every other module.

example:
go to posts root directory and run the following command
mklink .env ..\client\.env
go to comments root directory and run the same command
do this for all the other modules, event-bus, moderation, query

I know this isn't the right way to use and expose a .env file
but I was experimenting with mklink

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
