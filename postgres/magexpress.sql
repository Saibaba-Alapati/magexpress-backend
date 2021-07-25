-- sequelize-automate -t js -h localhost -d magexpresstest -u postgres -p sab@1009 -P 5432  -e postgres  -o "./models"
CREATE TYPE activitystatus AS ENUM ('online', 'offline');

CREATE TABLE  person (
	id BIGSERIAL PRIMARY KEY,
	firstname VARCHAR NOT NULL,
	lastname VARCHAR NOT NULL,
	username VARCHAR UNIQUE NOT NULL,
	companyname VARCHAR NOT NULL,
	email VARCHAR NOT NULL,
	password VARCHAR NOT NULL,
	status activitystatus default 'online',
	createdat TIMESTAMP,
	updatedat TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE project (
	id BIGSERIAL PRIMARY KEY,
	creatorid INT NOT NULL,
	name VARCHAR NOT NULL,
	description TEXT,
	createdat TIMESTAMP,
	updatedat TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE trackercontainer (
	id BIGSERIAL PRIMARY KEY,
    creatorid INT NOT NULL,
	name VARCHAR NOT NULL,
	description VARCHAR,
	projectid INT,
	createdat TIMESTAMP,
	updatedat TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE categorycontainer (
    id BIGSERIAL PRIMARY KEY,
    creatorid INT NOT NULL,
    trackercontainerid INT NOT NULL,
	projectid INT NOT NULL,
	name VARCHAR NOT NULL,
    description VARCHAR,
	createdat TIMESTAMP,
	updatedat TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tracker(
	id BIGSERIAL PRIMARY KEY,
    creatorid INT NOT NULL,
    trackercontainerid INT NOT NULL,
    categorycontainerid INT NOT NULL,
	projectid INT NOT NULL,
	name VARCHAR NOT NULL,
	content TEXT,
	createdat TIMESTAMP,
	startdate DATE,
	enddate DATE,
	updatedat TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE trackercomment (
	id BIGSERIAL PRIMARY KEY,
    creatorid INT NOT NULL,
	trackercontainerid INT NOT NULL,
	categorycontainerid INT NOT NULL,
	trackerid INT NOT NULL,
	projectid INT NOT NULL,
	content TEXT NOT NULL,
	createdat TIMESTAMP,
	updatedat TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE subtrackers (
	parenttrackerid INT NOT NULL,
	childtrackerid INT NOT NULL
);

CREATE TABLE linkedtrackers (
	trackerid1 INT NOT NULL,
	trackerid2 INT NOT NULL
);

CREATE TABLE assignees (
    assigneeid INT NOT NULL,
    trackerid INT NOT NULL
);

CREATE TABLE usersandtrackercontainers(
	userid INT NOT NULL,
	trackercontainerid INT NOT NULL
);

CREATE TABLE usersandprojects(
	userid INT NOT NULL,
	projectid INT NOT NULL
);

ALTER TABLE project ADD FOREIGN KEY(creatorid) REFERENCES person (id);

ALTER TABLE trackercontainer ADD FOREIGN KEY(projectid) REFERENCES project (id);

ALTER TABLE trackercontainer ADD FOREIGN KEY (creatorid) REFERENCES person (id);

ALTER TABLE categorycontainer ADD FOREIGN KEY(projectid) REFERENCES project (id);

ALTER TABLE categorycontainer ADD FOREIGN KEY (trackercontainerid) REFERENCES trackercontainer (id);

ALTER TABLE categorycontainer ADD FOREIGN KEY (creatorid) REFERENCES person (id);

ALTER TABLE tracker ADD FOREIGN KEY(projectid) REFERENCES project (id);

ALTER TABLE tracker ADD FOREIGN KEY (trackercontainerid) REFERENCES trackercontainer (id);

ALTER TABLE tracker ADD FOREIGN KEY (categorycontainerid) REFERENCES categorycontainer (id);

ALTER TABLE tracker ADD FOREIGN KEY (creatorid) REFERENCES person (id);

ALTER TABLE trackercomment ADD FOREIGN KEY (trackercontainerid) REFERENCES trackercontainer (id);

ALTER TABLE trackercomment ADD FOREIGN KEY (categorycontainerid) REFERENCES categorycontainer (id);

ALTER TABLE trackercomment ADD FOREIGN KEY (creatorid) REFERENCES person (id);

ALTER TABLE trackercomment ADD FOREIGN KEY (trackerid) REFERENCES tracker (id);

ALTER TABLE trackercomment ADD FOREIGN KEY(projectid) REFERENCES project (id);

ALTER TABLE subtrackers ADD FOREIGN KEY (parenttrackerid ) REFERENCES tracker (id);

ALTER TABLE subtrackers ADD FOREIGN KEY (childtrackerid ) REFERENCES tracker (id);

ALTER TABLE linkedtrackers ADD FOREIGN KEY (trackerid1 ) REFERENCES tracker (id);

ALTER TABLE linkedtrackers ADD FOREIGN KEY (trackerid2 ) REFERENCES tracker (id);

ALTER TABLE assignees ADD FOREIGN KEY (assigneeid ) REFERENCES person (id);

ALTER TABLE assignees ADD FOREIGN KEY (trackerid ) REFERENCES tracker (id);

ALTER TABLE usersandtrackercontainers ADD FOREIGN KEY (userid ) REFERENCES person (id);

ALTER TABLE usersandtrackercontainers ADD FOREIGN KEY (trackercontainerid ) REFERENCES trackercontainer (id);

ALTER TABLE usersandprojects ADD FOREIGN KEY (userid ) REFERENCES person (id);

ALTER TABLE usersandprojects ADD FOREIGN KEY (projectid) REFERENCES project (id);

-- UPCOMING WORK NOT YET PLANNED

CREATE TABLE directchat (
	id BIGSERIAL PRIMARY KEY,
	userid1 INT NOT NULL,
	userid2 INT NOT NULL,
	createdat TIMESTAMP,
	updatedat TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE directmessage(
	id BIGSERIAL PRIMARY KEY,
	authorid INT NOT NULL,
	receiverid INT NOT NULL,
    directchatid INT NOT NULL,
	content TEXT NOT NULL,
	replyId INT,
	privatereplyid INT,
	createdat TIMESTAMP,
	updatedat TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE room (
	id BIGSERIAL PRIMARY KEY,
    creatorid INT NOT NULL,
	name VARCHAR NOT NULL,
	description VARCHAR,
	createdat TIMESTAMP,
	updatedat TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE channel (
	id BIGSERIAL PRIMARY KEY,
    creatorid INT NOT NULL,
    roomid INT NOT NULL,
	name VARCHAR NOT NULL,
	createdat TIMESTAMP,
	updatedat TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE roommessage (
	id BIGSERIAL PRIMARY KEY,
    creatorid INT NOT NULL,
	roomid INT NOT NULL,
	channelid INT NOT NULL,
	content TEXT NOT NULL,
	replyid INT,
	forwarded INT,
	createdat TIMESTAMP,
	updatedat TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE usersandrooms (
	userid INT NOT NULL,
	roomid INT NOT NULL
);

ALTER TABLE directchat ADD FOREIGN KEY (userid1) REFERENCES person (id);

ALTER TABLE directchat ADD FOREIGN KEY (userid2) REFERENCES person (id);

ALTER TABLE directmessage ADD FOREIGN KEY (authorid) REFERENCES person (id);

ALTER TABLE directmessage ADD FOREIGN KEY (receiverid) REFERENCES person (id);

ALTER TABLE directmessage ADD FOREIGN KEY (directchatid) REFERENCES directchat (id);

ALTER TABLE directmessage ADD FOREIGN KEY (replyid) REFERENCES directmessage (id);

ALTER TABLE directmessage ADD FOREIGN KEY (privatereplyid) REFERENCES roommessage (id);

ALTER TABLE room ADD FOREIGN KEY (creatorid) REFERENCES person (id);

ALTER TABLE channel ADD FOREIGN KEY (roomid) REFERENCES room (id);

ALTER TABLE channel ADD FOREIGN KEY (creatorid) REFERENCES person (id);

ALTER TABLE roommessage ADD FOREIGN KEY (roomid) REFERENCES room (id);

ALTER TABLE roommessage ADD FOREIGN KEY (channelid) REFERENCES channel (id);

ALTER TABLE roommessage ADD FOREIGN KEY (creatorid) REFERENCES person (id);

ALTER TABLE roommessage ADD FOREIGN KEY (replyid) REFERENCES roommessage (id);

ALTER TABLE usersandrooms ADD FOREIGN KEY (userid ) REFERENCES person (id);

ALTER TABLE usersandrooms ADD FOREIGN KEY (roomid ) REFERENCES room (id);