import { ChatOpenAI } from '@langchain/openai'

export const analyze = async (prompt) => {
  const model = new ChatOpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    modelName: 'gpt-3.5-turbo',
  })

  console.log('OPENAI_API_KEY===========>', process.env.OPENAI_API_KEY)

  const response = await model.invoke(prompt)
  console.log('response===========>', response)
}
