
import React from 'react';
import {Accent,BoldText, TextContainer} from '@components/SolutionPage/Common/Common.style';
import {
    MessengerIcon,
    IconContainer
  } from '@views/SolutionPage/SolutionPaymentWaitingPage/SolutionPaymentWaitingPage.style';

interface LineProps {
    str: string;
    textAlign?:string;
}

const Parser: React.FC<LineProps> = ({
  str,textAlign
}) =>{
    if(str!==undefined){
        const str_array = str.split('<br>');
        return (
            <TextContainer textAlign={textAlign?textAlign:'left'}>
                {str_array.map((line,index) => {
                    let line_after:Array<any> = [];
                    let is_postprocessing = false;
                    if(line.match('<Accent>')){
                        line_after = line.split('<Accent>').map((word,index)=>{
                            if(index%2===1){
                                return <Accent>{word}</Accent>
                            }
                            return word;
                        })
                        is_postprocessing = true;
                    }else if(line.match('<Bold>')){
                        line_after = line.split('<Bold>').map((word,index)=>{
                            if(index%2===1){
                                return <BoldText>{word}</BoldText>
                            }
                            return word;
                        })
                        is_postprocessing = true;
                    }else if(line.match('<MessengerIcon>')){
                        line_after = line.split('<MessengerIcon>').map((word,index)=>{
                            if(index%2===1){
                                return <><IconContainer><MessengerIcon/></IconContainer>{word}</>
                            }
                            return word;
                        })
                        is_postprocessing = true;
                    }
                    if(is_postprocessing){
                        return <div key={line+index}>{line_after.map(word=>{return word})}</div>
                    }else{
                        return <div key={line+index}>{line}</div>
                    }
                })}
            </TextContainer>);
    }else{
        return <div></div>;
    }
};

export default Parser;