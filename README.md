# 该项目为为基于MEAN框架 改造过来的 
 （已经更换为使用postgresql  orm用的是 Sequelize）
## 主要使用 postgresql express angular.js node.js
# 安装说明 
## 安装 postgresql
## 安装 node.js V5.2.0 以及express V4.13.1
## 运行项目
### npm install 
### node server.js


## 创建数据表脚本
```sql
CREATE TABLE "public"."user" (
	"id" int4 NOT NULL DEFAULT nextval('user_id_seq'::regclass),
	"user_name" varchar(255) COLLATE "default",
	"display_name" varchar(255) COLLATE "default",
	"password" varchar(255) COLLATE "default",
	"mobile" varchar(255) COLLATE "default",
	"role" varchar(255) COLLATE "default",
	"source" varchar(255) COLLATE "default",
	"salt" varchar(255) COLLATE "default",
	"createdAt" timestamp(6) WITH TIME ZONE NOT NULL,
	"updatedAt" timestamp(6) WITH TIME ZONE NOT NULL
)
WITH (OIDS=FALSE);

-- ----------------------------
--  Primary key structure for table user
-- ----------------------------
ALTER TABLE "public"."user" ADD PRIMARY KEY ("id") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- ----------------------------
--  Uniques structure for table user
-- ----------------------------
ALTER TABLE "public"."user" ADD CONSTRAINT "user_user_name_key" UNIQUE ("user_name") NOT DEFERRABLE INITIALLY IMMEDIATE;

```
## 创建管理员账号脚本
-- 登陆名： 51admin
-- 默认密码： 123123
```sql
INSERT INTO "user" ("id","user_name","display_name","password","mobile","role","source","salt","createdAt","updatedAt") 
    VALUES (DEFAULT,'51admin','七彩管理员','hEcF5laVU/wcKw/3EpTcTYg1UzU7gGIfApLDs95DH0QOCbr8S1BUN2/GlOtfQBIElY/opkfoUm0yphLhT1EEsA==',
    '18626272086','admin','管理员添加',E'\\xf05e91bb20f2a4007379ce9933a37f68','2016-03-03 13:31:56.541 +00:00','2016-03-03 13:31:56.541 +00:00')
```

## 重新初始化数据表接口【慎用】
```
    GET /table_create/user
```