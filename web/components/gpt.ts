
export class GPTChatService {
  private apiUrl: string;
  private apiKey: string;
  private messages: any;

  constructor() {
    //this.apiUrl = process.env.CHATGPT_PUBLIC_API_URL;
    //this.apiKey = process.env.CHATGPT_PUBLIC_API_KEY;
    this.apiUrl = "https://api.openai.com";
    // this.apiKey = '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'; // lauzhack
    this.apiKey = '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'; // faysal
    this.messages = [];
  }

  public async getGptStorie(prompt: string): Promise<string> {
    this.messages.push({ role: 'user', content: 'Compose a story chapter comprising 30 words based on the following prompt: \n' + prompt });

    var responseBody = await this.callChatGPTChat();

    if (responseBody == false){
      return "The story is a dream. Thank you for your participation.";
    }

    var message = responseBody.choices[0].message.content;
    return message;
  }

  public async getGptStorieOptions(): Promise<string[]> {
    
    //this.messages.push({ role: 'user', content: 'Give me strictly two adjective word strictly separated by a comma like "replace word one, recplace word two" that will be used to continue with the next chapter of the story.' });
    this.messages.push({ role: 'user', content: 'Provide two adjective words, strictly separated by a comma (e.g., "word one, word two"), to be used for the next chapter of the story.' });
    var intent = 0;

    do{
      var responseBody = await this.callChatGPTChat();

      if (responseBody == false){
        adjectives = ['creative', 'pessimist'];
      } else {
        var str_adjectives = responseBody.choices[0].message.content;
        var adjectives = []
        adjectives = str_adjectives.split(',');
        intent++;  
      }
      debugger;
    } while (adjectives.length != 2 && intent < 5);

    if (intent >= 5){
      adjectives = ['creative', 'pessimist'];
    }

    return adjectives;
  }

  public async doGptStorieOption(prompt: string): Promise<string> {
    
    this.messages.push({ role: 'system', content: 'Continue the next part of the story, without title, taking into account the provided adjectives.    :\n ' + prompt });

    var responseBody = await this.callChatGPTChat();

    if (responseBody == false){
      return "The next chapter story is secret. Thank you for your participation.";
    }

    var message = responseBody.choices[0].message.content;
    return message;
  }


  public async callChatGPTChat(): Promise<any> {
    const url = `${this.apiUrl}/v1/chat/completions`;
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`,
    };

    const body = JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: this.messages,
      //temperature: 1,
      //top_p: 1,
      //n: 1,
      //stream: false,
      max_tokens: 200,
      //presence_penalty: 0,
      //frequency_penalty: 0,
    });

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: body,
      });

      if (!response.ok) {
        const errorText = await response.text();
        debugger;
        return false;

        //throw new Error(`Failed to send messages: ${errorText}`);
        // ficar un conte inventat per fer el pego.

      }
      const responseBody = await response.json();
      return responseBody;
    } catch (error) {
      console.error('Error sending messages:', error);
      debugger;
      return false;
      //throw error;
      // ficar un conte inventat per fer el pego.
    }
  }

}
/*
// Example usage
const gptChatService = new GPTChatService();
const messages = [
  { role: 'user', content: 'Who won the world series in 2020?' },
  { role: 'assistant', content: 'The Los Angeles Dodgers won the World Series in 2020.' },
  { role: 'user', content: 'Where was it played?' },
];

gptChatService.sendMessages(messages)
  .then((response) => {
    console.log('API Response:', response);
  })
  .catch((error) => {
    console.error('Error:', error);
  });

*/