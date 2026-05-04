import { pipeline, env } from '@xenova/transformers';
import portfolioData from './data.json';

// Skip local checks so it pulls from Hub
env.allowLocalModels = false;

let embedder: any = null;
let contextEmbeddings: { text: string, vector: number[] }[] = [];

export async function initRAG() {
  if (embedder) return true;
  
  try {
    embedder = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
    
    for (const text of portfolioData) {
      const output = await embedder(text, { pooling: 'mean', normalize: true });
      contextEmbeddings.push({
        text,
        vector: Array.from(output.data)
      });
    }
    return true;
  } catch (error) {
    console.error("Failed to init RAG:", error);
    return false;
  }
}

function cosineSimilarity(vecA: number[], vecB: number[]) {
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

export async function findRelevantContext(query: string) {
  if (!embedder) return "";
  
  const queryOutput = await embedder(query, { pooling: 'mean', normalize: true });
  const queryVector = Array.from(queryOutput.data) as number[];
  
  const scored = contextEmbeddings.map(item => ({
    text: item.text,
    score: cosineSimilarity(queryVector, item.vector)
  }));
  
  scored.sort((a, b) => b.score - a.score);
  
  return scored.slice(0, 3).map(s => s.text).join("\\n");
}
