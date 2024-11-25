import admin from "firebase-admin";
import { initializeApp } from 'firebase-admin/app';
import 'dotenv/config'

import firebaseConfig from './firebaseConfig.js'

const app = initializeApp({
    credential: admin.credential.cert(firebaseConfig)
});