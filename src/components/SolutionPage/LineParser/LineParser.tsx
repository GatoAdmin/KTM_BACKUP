
import React from 'react';
import {Accent} from '@components/SolutionPage/Common/Common.style';

interface LineProps {
    str: string;
}

const Parser: React.FC<LineProps> = ({
  str
}) =>{
    if(str!==undefined){
        const str_array = str.split('<br>');
        return (
            <div>
                {str_array.map((line) => {
                    if(str.match('<Accent>')){
                        const line_array = line.split('<Accent>').map((word,index)=>{
                            if(index%2===1){
                                return <Accent>{word}</Accent>
                            }
                            return word;
                        })
                        return <div>{line_array.map(word=>{return word})}</div>
                        
                    }
                   return <div>{line}</div>
                })}
            </div>);
    }else{
        return <div></div>;
    }
};

export default Parser;