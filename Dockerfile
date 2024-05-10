FROM node:21-alpine as builder

# Set directory for all files
WORKDIR /home/node/app
# Copy over package.json files
COPY package*.json ./
# Install all packages
RUN npm install
# Copy over source code
COPY . .
# Build AdonisJS for production
RUN npm run build

# Build final runtime container
FROM node:21-alpine
# Setup env with defaults
ENV NODE_ENV=production
ENV SESSION_DRIVER=cookie
# Allow traffic only from local proxy
ENV HOST=127.0.0.1
ENV PORT=3333
ENV TZ=utc
ENV LOG_LEVEL=info
# Set up env variables
ENV APP_KEY=
ENV DB_HOST=
ENV DB_PORT=
ENV DB_USER=
ENV DB_PASSWORD=
ENV DB_DATABASE=
ENV SMTP_HOST=
ENV SMTP_PORT=
ENV SMTP_USERNAME=
ENV SMTP_PASSWORD=
# Set home dir
WORKDIR /home/node/app
# Copy over built files
COPY --from=builder /home/node/app/build .
# Install only required packages
RUN npm ci --omit=dev
# Expose port to outside world
EXPOSE 3333
# Start server up
CMD [ "node", "./bin/server.js" ]
