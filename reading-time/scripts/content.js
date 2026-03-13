function renderReadingTime(article)
{
  if(!article)
  {
    return;
  }
  
  const text=article.textContent;
  const regex=/[^\s]+/g; 
  const words=text.matchAll(regex);
  const wordCount=[...words].length;
  const readingTime=Math.round(wordCount/200);
  const badge=document.createElement("p");
  
  badge.classList.add("color-secondary-text","type--caption");
  badge.textContent=`⏱️ ${readingTime} min read`;
  
  const heading=article.querySelector("h1");
  const date=article.querySelector("time")?.parentNode;
  
  (date ?? heading).insertAdjacentElement("afterend",badge);
  
}

renderReadingTime(document.querySelector("article"));


const observer = new MutationObserver((mutations)=>{
  //mutations is a list of Addednodes 
  //so we have to loop through the addednodes 
  //each added node has list of tags 
  for(const mutation of mutations)
  {
    for(const node of mutation.addedNodes)
    {
      if(node instanceof Element && node.tagName === 'ARTICLE')
      {
        renderReadingTime(node);
      }
    }
  }
}
);

observer.observe(document.querySelector('devsite-content'),{
  childList : true
}
);
