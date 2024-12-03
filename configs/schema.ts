import { pgTable, serial, varchar, boolean, json, integer } from "drizzle-orm/pg-core";

export const Users=pgTable('users', {
    id: serial('id').primaryKey(),
    name: varchar('name').notNull(),
    email: varchar('email').notNull(),
    imageUrl: varchar('image_url'),
    subscription:boolean('subscription').notNull().default(false),
    credits: integer('credits').notNull().default(30)
})

export const VideoData=pgTable('videoData', {
    id: serial('id').primaryKey(),
    script: json('script').notNull(),
    audioFileUrl: varchar('audioFileurl').notNull(),
    captions: json('captions').notNull(),
    imageList: varchar('imageList').array(),
    createdBy: varchar('createdBy').notNull()
});