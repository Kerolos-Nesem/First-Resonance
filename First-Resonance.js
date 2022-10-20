// In this challenge, you will implement commands that allow a user to create, move and delete directories.

/*
CREATE fruits 
CREATE vegetables
CREATE grains
CREATE fruits/apples
CREATE fruits/apples/fuji
LIST
CREATE grains/squash
MOVE grains/squash vegetables
CREATE foods
MOVE grains foods
MOVE fruits foods
MOVE vegetables foods
LIST
DELETE fruits/apples
DELETE foods/fruits/apples
LIST
*/

/*
CREATE fruits
CREATE vegetables
CREATE grains
CREATE fruits/apples
CREATE fruits/apples/fuji
LIST
fruits
  apples
    fuji
grains
vegetables
CREATE grains/squash
MOVE grains/squash vegetables
CREATE foods
MOVE grains foods
MOVE fruits foods
MOVE vegetables foods
LIST
foods
  fruits
    apples
      fuji
  grains
  vegetables
    squash
DELETE fruits/apples
Cannot delete fruits/apples - fruits does not exist
DELETE foods/fruits/apples
LIST
foods
  fruits
  grains
  vegetables
    squash
*/

/*
You should not implement an interactive console program that actually creates folders on the host machine or reads inputs from the command line.
You should implement a program that takes the above input line-by-line (you can hard-code the inputs into your program) and produces exactly the output shown above, while internally maintaining the directory structure.
Do not use any 3rd party libraries. Make sure all the code is your own.
Please include all necessary instructions for getting your code to run. 
*/

const root = {
    name: 'root',
    list:{}
}

//constructor
function addingInputs (arg){

    return {
        name: arg, 
        list:{}
    };

};

const dirs = {
    run: function (str) {
        
            function CREATE (path){
            
                
                let curr = root;
                
                const toAdd = path.pop();

                for(let i = 0 ; i < path.length; i++){
                       
                    curr=curr.list[path[i]];
                    
                }
            
                if(!curr.list.hasOwnProperty(toAdd)){

                 curr.list[toAdd] = addingInputs(toAdd); 

                    console.log(str);
                    return str;
                } else {
                    return `Cannot add ${path}`;
                }

            }
        
            function LIST (){
                
                console.log('LIST');
            
                function recall (curr,space) {


                    if(!curr) return 
                    if(curr.name !== 'root') console.log(' '.repeat(space)+curr.name);



                    for(let prop in curr.list){


                        recall(curr.list[prop], space + 2)

                    }

                }

                recall(root,-2);

                return;
            }
        
            function MOVE (str){
                
                const [,payload,dest] = str.split(' ');
                const old = payload.split('/');

                let curr = root;
                let hold = null;


                for(let el of old ){
                    console.log(el);

                    
                    if(el == old[old.length - 1]){
                        
                        hold = curr.list[old[old.length -1]];
                        delete curr.list[old[old.length -1]];
                    }
                    
                    curr = curr.list[el]
                
                }


                
                curr = root;

               
                 const newer = dest.split('/')

                for(let el of newer){
                    curr = curr.list[el]
                }

             
                
               
                if(!curr.list.hasOwnProperty(newer[newer.length - 1])){

                    curr.list[old[old.length - 1]] = hold; 
                    
                   
                    console.log(str);
                    
                    return str;
                } else {
                    return `Cannot add ${path}`;
                }




            };
        
            function DELETE (path){ 

                let curr = root;

                const toAdd = path.pop();

                for(let i = 0 ; i < path.length; i++){
                       

                    if(curr.list[path[i]] === undefined){
                    
                        console.log(`Cannot delete ${payload}  - ${path} doesn't exist`);
                        return `Cannot delete${path} - ${path} doesn't exist`;
                    
                    }
                    curr=curr.list[path[i]];
                    
                }
            
                if(curr.list.hasOwnProperty(toAdd)){

                 delete curr.list[toAdd];

                    console.log(str);

                    return str;

                } 


            }        
     
            const [command, payload] = str.split(' ') 
          
            const path = payload?.split('/')

            
           if(command === 'CREATE') return CREATE(path)
           if(command === 'LIST') return LIST()
           if(command === 'MOVE') return MOVE(str)
           if(command === 'DELETE') return DELETE(path)
        
    }
}

dirs.run('CREATE fruits')
dirs.run('CREATE vegetables')
dirs.run('CREATE grains')
dirs.run('CREATE fruits/apples')
dirs.run('CREATE fruits/apples/fuji')
dirs.run('LIST')
dirs.run('CREATE grains/squash')
dirs.run('MOVE grains/squash vegetables')
dirs.run('CREATE foods')
dirs.run('MOVE grains foods')
dirs.run('MOVE fruits foods')
dirs.run('MOVE vegetables foods')
dirs.run('LIST')
dirs.run('DELETE fruits/apples')
dirs.run('DELETE foods/fruits/apples')
dirs.run('LIST ')
