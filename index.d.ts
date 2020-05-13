import express from 'express'
declare module 'express' {
    export interface Request {
        user_id: string
        role_id: number
        organization_id: string
}}