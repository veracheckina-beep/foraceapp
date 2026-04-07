from aiogram import Bot, Dispatcher, types
from aiogram.types import Message
import asyncio
import json

TOKEN = "ТВОЙ_ТОКЕН"

bot = Bot(token=TOKEN)
dp = Dispatcher()

@dp.message()
async def handle_message(message: Message):
    if message.web_app_data:
        data = json.loads(message.web_app_data.data)

        text = f"""
🔥 НОВАЯ ЗАЯВКА

Имя: {data['name']}
Возраст: {data['age']}
Телефон: {data['phone']}
        """

        await message.answer(text)

async def main():
    await dp.start_polling(bot)

asyncio.run(main())
