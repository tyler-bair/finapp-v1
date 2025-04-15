## BACK END
RUN APP WITH: `./mvnw spring-boot:run`

DOWNLOAD DEPENDENCIES: `./mvnw install`

To Access DB:
From terminal:

    1) psql postgres
    
    2) \c finance_dashboard
    

Purpose	Command Example
List all databases              \l
Connect to a database           \c finance_dashboard
List all tables 	            \dt
Show table structure	        \d portfolio
Insert a new portfolio          INSERT INTO portfolio (name, created_at) VALUES ('Default Portfolio', NOW());
View all rows in portfolio      SELECT * FROM portfolio;
Delete all rows                 DELETE FROM portfolio;
Delete specific row by ID	    DELETE FROM portfolio WHERE id = 1;
Exit psql                     	\q

## Front end
RUN APP WITH: `npm start`

DOWNLOAD DEPENDENCIES: `npm i` or `npm install`
