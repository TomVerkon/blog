# base image is an alpine node version 19.x.x
FROM node:19-alpine3.16

# This will be the base directory for code, etc
WORKDIR /app 

# copy only package.json so can change code later and not reload all libraries
COPY package.json ./

# install all node dependencies and typescript
RUN npm install && npm install typescript -g

# Copy all the rest of the files
COPY ./ ./

# Set environment variables
ENV REACT_APP_BASE_URL=http://localhost
ENV REACT_APP_POST_PORT=4000
ENV REACT_APP_COMMENT_PORT=4001
ENV REACT_APP_QUERY_PORT=4002
ENV REACT_APP_MODERATION_PORT=4003
ENV REACT_APP_EVENTBUS_PORT=4005
ENV REACT_APP_POST_CREATED=PostCreated
ENV REACT_APP_COMMENT_CREATED=CommentCreated
ENV REACT_APP_COMMENT_MODERATED=CommentModerated
ENV REACT_APP_COMMENT_UPDATED=CommentUpdated

# Run the typescript transpiler
RUN tsc

# tell docker how to start
CMD ["node", "start"]
