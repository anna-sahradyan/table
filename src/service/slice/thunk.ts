import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';



// Запрос для получения тестов
export const fetchTests = createAsyncThunk('data/fetchTests', async () => {
    try {
        const response = await axios.get('http://localhost:3100/tests');
        return response.data;
    } catch (error) {
        throw new Error('Ошибка при получении тестов');
    }
});


export const fetchSites = createAsyncThunk('data/fetchSites', async () => {
    try {
        const response = await axios.get('http://localhost:3100/sites');
        return response.data;
    } catch (error) {
        throw new Error('Ошибка при получении сайтов');
    }
});



