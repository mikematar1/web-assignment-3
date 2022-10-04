var board= [-1,-1,-1,-1,-1,-1,-1,-1,-1];
var gamestatus=1;
var winners = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
function checktie(){
    for(var i=0;i<board.length;i++){
        if(board[i]==-1){
            return false;
        }

    }
    return true;
}
function checkwinner(){
    for(var i=0;i<winners.length;i++){
        if(board[winners[i][0]]!=-1 && board[winners[i][0]]==board[winners[i][1]] && board[winners[i][0]]==board[winners[i][2]]){
            
            return board[winners[i][0]];
        }
    }
    if(checktie()){
        return -2;
    }else{
        return -1;
    }
    
}

function minmax(ismaximizing,depth){
    let iswinner=checkwinner();
    if(iswinner==-2){
        return 0;
    }else if(iswinner==0){
        return 1;
    }else if(iswinner==1){
        return -1;
    }

    if(ismaximizing){
        let bestScore=-Infinity;
        let score;
        for(var i=0;i<board.length;i++){
            if(board[i]==-1){
                board[i]=1;
                score=minmax(false,0);
                board[i]=-1
                if(score>bestScore){
                    bestScore=score;
                    
                }
            }
        }
        return bestScore;
    }else{
        let bestScore=Infinity;
        let score;
        for(var i=0;i<board.length;i++){
            if(board[i]==-1){
                board[i]=0;
                score=minmax(true,0);
                board[i]=-1
                if(score<bestScore){
                    bestScore=score;
                    
                }
            }
        }
        return bestScore;
    }
}

function computer(){
    var bestScore=-Infinity;
    var bestMove;
    var score;
    for(var i=0;i<board.length;i++){
        if(board[i]==-1){
            board[i]=0;
            score=minmax(true,0);
            board[i]=-1
            if(score>bestScore){
                bestScore=score;
                bestMove=i; 
            }
        }
    }
    board[bestMove]=0;
    
    document.getElementById(bestMove+1).innerHTML="<img class='piece' src='yellow.png'>"
    let iswinner=checkwinner();
        if(iswinner==-2){
            //its a tie
            document.getElementById("status").innerHTML="It's a tie";
            gamestatus=0;
        }else if(iswinner==0){
            // Computer wins
            document.getElementById("status").innerHTML="Computer won";
            gamestatus=0;
        }else if(iswinner==1){
            //player wins
            document.getElementById("status").innerHTML="You won";
            gamestatus=0;
        }
}
function makemove(index){
    if(board[index-1]==-1 && gamestatus){
        board[index-1]=1;
        document.getElementById(index).innerHTML="<img class='piece' src='red.png'>"
        let iswinner=checkwinner();
        if(iswinner==-2){
            //its a tie
            document.getElementById("status").innerHTML="It's a tie";
            gamestatus=0;
        }else if(iswinner==0){
            // Computer wins
            document.getElementById("status").innerHTML="Computer won";
            gamestatus=0;
        }else if(iswinner==1){
            //player wins
            document.getElementById("status").innerHTML="You won";
            gamestatus=0;
        }
        else{
            computer();
        }

        
        
    }
    
}
