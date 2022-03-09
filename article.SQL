create database egg_article;

use egg_article;

create table article(
  id int(10) not null auto_increment,
  img text default null comment '缩略图',
  title varchar(100) default null comment '文章标题',
  summary varchar(300) default null comment '文章简介',
  content text default null comment '文章内容',
  createTime timestamp default null comment '发布时间',
  primary key(id)
)engine=InnoDB AUTO_INCREMENT=1 comment '文章表';

insert into article(img,title,summary,content,createTime) values('http://img2.mukewang.com','编程必备基础知识：计算机组成原理+操作系统+计算机网络','介绍编程必备基础知识，快速、系统的补足必备的计算机系统知识，更快、更有趣、更快、更贴近实际工作需要的知识','文章内容暂无','2021-07-19 10:20:20');

