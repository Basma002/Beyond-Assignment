from langchain_community.document_loaders import PyPDFLoader
from langchain_community.vectorstores import FAISS
from langchain_huggingface import HuggingFaceEmbeddings, HuggingFacePipeline
from langchain.chains import RetrievalQA
from transformers import pipeline
from langchain.text_splitter import CharacterTextSplitter

def load_document(file_path):
    loader = PyPDFLoader(file_path)  
    documents = loader.load()
    return documents

def split_document(documents):
    text_splitter = CharacterTextSplitter(chunk_size=2000, chunk_overlap=200)
    chunks = text_splitter.split_documents(documents)
    return chunks


def create_retriever(chunks):
    # Use a local embedding model
    embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
    vectorstore = FAISS.from_documents(chunks, embeddings)
    return vectorstore.as_retriever()


def create_qa_system(retriever):
    # Configure the Hugging Face text-generation pipeline
    local_pipeline = pipeline(
        "text-generation",
        model="distilgpt2",
        device="cpu",
        max_new_tokens=100,  
        truncation=True,  
        pad_token_id=50256, 
    )
    

    llm = HuggingFacePipeline(pipeline=local_pipeline)
    

    qa_system = RetrievalQA.from_chain_type(llm=llm, retriever=retriever)
    return qa_system

def query_document(qa_system):
    print("Ask a question about the document (or type 'exit' to quit):")
    while True:
        user_query = input("You: ")
        if user_query.lower() == "exit":
            print("Goodbye!")
            break

        # Generate response
        response = qa_system.invoke({"query": user_query})  
        print(f"Agent: {response}")

if __name__ == "__main__":
    # Load and process the document
    file_path = "chapter.pdf"  
    documents = load_document(file_path)
    chunks = split_document(documents)
    
    retriever = create_retriever(chunks)
    qa_system = create_qa_system(retriever)
    
    # Start querying
    query_document(qa_system)
