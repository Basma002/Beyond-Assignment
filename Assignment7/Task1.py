from langchain_community.llms import _import_ollama
from langchain.chains import ConversationChain
from langchain.memory import ConversationBufferMemory


Ollama = _import_ollama()

if not Ollama:
    raise ImportError("Failed to load the Ollama module.")

def create_conversational_agent():
    """
    Initializes a conversational agent using LangChain's ConversationChain
    with Ollama as the LLM and memory for context.
    """
    #Initialize the Ollama model
    llm = Ollama(model="llama2") 

    #Set up memory for conversation context
    memory = ConversationBufferMemory()

    #Create the ConversationChain
    conversation = ConversationChain(llm=llm, memory=memory)

    return conversation

def test_agent(conversation):
    """
    Tests the conversational agent by allowing the user to ask questions.
    """
    print("Send a message (/? for help).")
    while True:
        user_input = input("You: ")
        if user_input.lower() in ["exit", "quit"]:
            print("Ending the conversation. Goodbye!")
            break
        # Run the conversation chain
        response = conversation({"input": user_input})
        print(f"Agent: {response['response']}")

if __name__ == "__main__":
    # Create the conversational agent
    agent = create_conversational_agent()

    test_agent(agent)
