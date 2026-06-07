

CREATE TYPE job_status AS ENUM (
    'pending',
    'urgent',
    'in_progress',
    'fulfilled',
    'cancelled',
    'closed'
);

CREATE TYPE role AS ENUM (
    'user',
    'admin'
);



create table users(
name varchar(30) Not Null , 
email varchar(100) primary key ,
password varchar(100) not null,
role role DEFAULT 'user',
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
alter table users alter column password type varchar(100)
drop table users
drop table contacts
drop table events
drop table chat
drop table requests

select * from users
INSERT INTO users (name, email,password) VALUES
('moh', 'moh1@gmail.com' ,'Teacher'),
('ali', 'ali@gmail.com','Teacher');

INSERT INTO users (name, email,password,role) VALUES
('admin', 'admin123@gmail.com' ,'123','admin')




create table requests(
id serial primary key , 
description varchar(300),
reqby varchar(100), 
title varchar(30),
bonus varchar(5),
jobtype varchar(30),
worklocation varchar(20),
location varchar(200),
experience varchar(20),
category varchar(30),
status job_status DEFAULT 'pending',
isurgent bool,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
constraint fk_em 
  foreign key (reqby) references users(email)

);

update requests set status = 'closed' where id =2 
delete from requests where title = '.NET Developer'

drop table requests

select * from requests



create table chat(
id serial primary key,
user1 varchar(100), 
user2 varchar(100) ,
content varchar(200),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
Constraint fk_u1 
  foreign key (user1) references users(email),
  Constraint fk_u2
  foreign key (user2) references users(email)

);




select * from chat
select * from chat order by created_at asc
drop table chat 


create table contacts(
user1 varchar(100), 
firstname varchar(100),
lastname varchar(100),
gmail VARCHAR(100),
 PRIMARY KEY (user1, gmail),
Constraint fk_u1 
  foreign key (user1) references users(email),
  Constraint fk_u2
  foreign key (gmail) references users(email)

);

drop table contacts

select * from users
insert into users(name, email,password) values('issa','admin@gmail.com','admin123')
insert into users(name, email,password) values('hussein','hussein@gmail.com','husse')


insert into users(name, email,password) values('admin1','admin1@gmail.com','husse')

insert into requests(description,reqby , Title ,bonus) values('Need math teacher in school in newyork','moh1@gmail.com','Teacher','10$')


select * from requests

drop table requests


select * from contacts
delete from contacts where user1='moh1@gmail.com' and gmail = 'moh1@gmail.com'

select * from chat

delete from requests where title='PHP Dev'

select * from users


select * from events



create table Events(
id serial primary key , 
Title varchar(50),
Description varchar(300),
Location varchar(50),
Date DATE ,
start_time TIME,
end_time TIME,
Organizer varchar(30),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

drop table events

select * from events
insert into events(title ,description,location , date,start_time ,end_time ,organizer) values('WEBINAR','is a wbinar done by web development proffessionals it will be a tour in cybersecurity domain mainly security issues ,white and red hat teams..','Lebanese University','2027-2-20','10:00:00',
    '12:00:00','murex')

drop table chat






