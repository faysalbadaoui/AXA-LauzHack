"use client";

import { GPTChatService } from "../../components/gpt";
var gpt = new GPTChatService();


console.log(gpt.axaObjectToTable());
/*gpt.doGptAxaServiceSelection(`Benny's escapade led to an unexpected accident, but AXA's reliable service came to the rescue. Their friendly approach not only covered Benny's immediate vet bills but also addressed any potential long-term effects. The community, reassured by AXA's commitment, found solace in their comprehensive support. Benny not only recovered but became a symbol of the community's resilience. Thanks to AXA, the school moved forward, turning a mischievous mishap into a testament of security and care for all.`).then((result) => {

  debugger;
  console.log(result);  
  
});*/

debugger;
gpt.getGptStorie('A BROWN DOG GO TO SCHOOL').then((result) => {

  debugger;
  console.log(result);

  gpt.getGptStorieOptions().then((result) => {

    debugger;
    console.log(result);

    gpt.doGptStorieOption(result[0]).then((result) => {

      debugger;
      console.log(result);  

      gpt.doGptStorieEnding().then((result) => {

        debugger;
        console.log(result);  

        gpt.doGptAxaServiceSelection(result).then((result) => {

          debugger;
          console.log(result);  
          
        });
        
      });
      
    });

  });

});

console.log(process.env.CHATGPT_PUBLIC_API_URL);
console.log(process.env.CHATGPT_PUBLIC_API_KEY);

function TestPage() {
  return ('');
}

export default TestPage;
