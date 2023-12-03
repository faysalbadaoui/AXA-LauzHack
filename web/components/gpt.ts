export class GPTChatService {
  
  private apiUrl: string;
  private apiKey: string;
  private apiImageKey: string;
  private messages: any;
  private prompt: string;

  private axa_services: Record<number, {serviceName: string, serviceURL: string}> = {
    1: { serviceName: "Car insurance", serviceURL: "https://www.axa.ch/en/private-customers/offers/vehicle-travel/car-insurance.html" },
    2: { serviceName: "Motorcycle insurance", serviceURL: "https://www.axa.ch/en/private-customers/offers/vehicle-travel/motorcycle-insurance.html" },
    3: { serviceName: "Travel insurance", serviceURL: "https://www.axa.ch/en/private-customers/offers/vehicle-travel/travel-insurance.html" },
    4: { serviceName: "Boat insurance", serviceURL: "https://www.axa.ch/en/private-customers/offers/vehicle-travel/boat-insurance.html" },
    5: { serviceName: "Rental car insurance", serviceURL: "https://www.axa.ch/en/private-customers/offers/vehicle-travel/hirecar-carsharing-insurance.html" },
    6: { serviceName: "Supplementary insurance", serviceURL: "https://www.axa.ch/en/private-customers/offers/health-accident/supplementary-insurance.html" },
    7: { serviceName: "Compare basic insurance", serviceURL: "https://www.axa.ch/en/private-customers/offers/health-accident/terminate-basic-insurance.html" },
    8: { serviceName: "Accident insurance for domestic staff", serviceURL: "https://www.axa.ch/en/private-customers/offers/health-accident/accident-insurance-domestic-staff.html" },
    9: { serviceName: "Interim accident insurance", serviceURL: "https://www.axa.ch/en/private-customers/offers/health-accident/interim-accident-insurance.html" },
    10: { serviceName: "Aviation insurance", serviceURL: "https://www.axa.ch/en/private-customers/offers/vehicle-travel/aviation-insurance.html" },
    11: { serviceName: "Liability insurance", serviceURL: "https://www.axa.ch/en/private-customers/offers/property-living/personal-liability-insurance.html" },
    12: { serviceName: "Household contents insurance", serviceURL: "https://www.axa.ch/en/private-customers/offers/property-living/household-contents.html" },
    13: { serviceName: "Items & electronics", serviceURL: "https://www.axa.ch/en/private-customers/offers/property-living/items-electronics.html" },
    14: { serviceName: "Valuable items insurance", serviceURL: "https://www.axa.ch/en/private-customers/offers/property-living/valuables-insurance.html" },
    15: { serviceName: "Rental guarantee", serviceURL: "https://www.axa.ch/en/private-customers/offers/property-living/rental-guarantee.html" },
    16: { serviceName: "Building insurance", serviceURL: "https://www.axa.ch/en/private-customers/offers/property-living/building-insurance.html" },
    17: { serviceName: "House construction insurance", serviceURL: "https://www.axa.ch/en/private-customers/offers/property-living/house-construction-insurances.html" },
    18: { serviceName: "Mortgages", serviceURL: "https://www.axa.ch/en/private-customers/offers/property-living/mortgages.html" },
    19: { serviceName: "Legal protection insurance", serviceURL: "https://www.axa.ch/en/private-customers/offers/law-cyber/legal-protection-insurance.html" },
    20: { serviceName: "Personal cyber insurance", serviceURL: "https://www.axa.ch/en/private-customers/offers/law-cyber/personal-cyber-insurance.html" },
    21: { serviceName: "Payment protection insurance", serviceURL: "https://www.axa.ch/en/private-customers/offers/law-cyber/payment-protection-insurance.html" },
    22: { serviceName: "My pension fund", serviceURL: "https://www.axa.ch/en/private-customers/offers/pensions-assets/my-pension-fund.html" },
    23: { serviceName: "Private pension provision", serviceURL: "https://www.axa.ch/en/private-customers/offers/pensions-assets/pillar3-private-pension-provision.html" },
    24: { serviceName: "Investing", serviceURL: "https://www.axa.ch/en/private-customers/offers/pensions-assets/financial-investments.html" },
    25: { serviceName: "Protect against the risks of disability and death", serviceURL: "https://www.axa.ch/en/private-customers/offers/pensions-assets/cover-disability-death.html" },
    26: { serviceName: "Planning your retirement", serviceURL: "https://www.axa.ch/en/private-customers/offers/pensions-assets/planning-retirement.html" },
  };

  constructor() {
    this.apiImageKey = process.env.NEXT_PUBLIC_CHATGPT_PUBLIC_API_IMAGE_KEY
    this.apiUrl = process.env.NEXT_PUBLIC_CHATGPT_PUBLIC_API_URL;
    this.apiKey = process.env.NEXT_PUBLIC_CHATGPT_PUBLIC_API_KEY;
    this.messages = [];
    this.prompt = '';
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

  public async getGptTitle(prompt: string): Promise<string> {
    this.messages.push({ role: 'user', content: 'Given the following text, create a compelling five-word title that encapsulates its essence: \n' + prompt });

    var responseBody = await this.callChatGPTChat();

    if (responseBody == false){
      return "Whispers of Eternity: Unveiling the Tapestry of Time";
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
    } while (adjectives.length != 2 && intent < 5);

    if (intent >= 5){
      adjectives = ['creative', 'pessimist'];
    }

    return adjectives;
  }

  public async doGptStorieOption(option: string): Promise<string> {
    
    this.messages.push({ role: 'system', content: 'Continue the next part of the story, without title, comprising 30 words taking into account the provided adjectives.    :\n ' + option });

    var responseBody = await this.callChatGPTChat();

    if (responseBody == false){
      return "The next chapter story is secret. Thank you for your participation.";
    }

    var message = responseBody.choices[0].message.content;
    return message;
  }

  public async doGptStorieEnding(): Promise<string> {
    
    this.messages.push({ role: 'system', content: 'Compose the conclusion with 60 words of the narrative featuring a scenario wherein the insurance firm AXA delivers a service that encompasses the repercussions of the accident or incident.' });

    var responseBody = await this.callChatGPTChat();

    if (responseBody == false){
      return "AXA insurance company has given insurance that solves all the problems.";
    }

    var message = responseBody.choices[0].message.content;
    return message;
  }

  public async doGptAxaServiceSelection(prompt: string): Promise<{serviceName: string, serviceURL: string}> {
    
    debugger;
    this.messages.push({ role: 'system', content: 'Starting from this table:   \n\n' + this.axaObjectToTable() + '\n\n Show only the "ID" column of a single service that corresponds to this part of the history:   \n\n' + prompt + '\n\n The output must only be a number    '});

    var responseBody = await this.callChatGPTChat();

    if (responseBody == false){
      return this.axa_services[1];
    }

    var message = responseBody.choices[0].message.content;
    var service = this.axa_services[1];

    try {
      var service_key = parseInt(message);
      service = this.axa_services[service_key];
    } catch (error) {
      console.error('Error sending messages:', error);
      service = this.axa_services[1];
      debugger;
    }

    return service;
  }

  public async getGptImage(prompt: string): Promise<string> {
    
    this.prompt = 'comic book style: ' + prompt;
    var responseBody = await this.callChatGPTChatImage();

    if (responseBody == false){
      return 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-HL3itsiK4BaIX5fQR2OkE8T2/user-63L3WQrKtpArmIckMx9hskYG/img-xUxEmOL6TnCLIojaMa9mcSXV.png?st=2023-12-02T21%3A14%3A44Z&se=2023-12-02T23%3A14%3A44Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-12-01T22%3A41%3A11Z&ske=2023-12-02T22%3A41%3A11Z&sks=b&skv=2021-08-06&sig=feAtpCT/BPPRWtdtESUecZ3H2/aLlTruiwhh3aWG2AE%3D';
    }

    var keys = responseBody.data[0].url;
    return keys;
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
      //max_tokens: 200,
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
        return false;
        debugger;

        //throw new Error(`Failed to send messages: ${errorText}`);
        // ficar un conte inventat per fer el pego.

      }
      const responseBody = await response.json();
      return responseBody;
    } catch (error) {
      console.error('Error sending messages:', error);
      return false;
      debugger;
      //throw error;
      // ficar un conte inventat per fer el pego.
    }
  }

  public async callChatGPTChatImage(): Promise<any> {
    const url = `${this.apiUrl}/v1/images/generations`;
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${this.apiImageKey}`,
    };

    const body = JSON.stringify({
      model: 'dall-e-3',
      prompt: this.prompt,
      size: '1024x1024',
      //temperature: 1,
      //top_p: 1,
      //n: 1,
      //stream: false,
      n: 1
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

        //throw new Error(`Failed to send messages: ${errorText}`);

      }
      const responseBody = await response.json();
      return responseBody;
    } catch (error) {
      console.error('Error sending messages:', error);
      debugger;
      //throw error;
    }
  }

  public axaObjectToTable(): string {
    let outputString = "Servicio;ID\n";
    for (const id in this.axa_services) {
        outputString += `${this.axa_services[id].serviceName.toUpperCase()};${id}\n`;
    }
    return outputString;
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