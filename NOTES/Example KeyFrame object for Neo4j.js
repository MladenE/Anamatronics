
/*

        Example object passed to Neo4j.
        Use UNWIND to convert it to nodes and vertexes.

        Guids are generated in the controller

*/

const data = {
    keyFrame : { id : guid, note : string }
  , servos   : [
            {
            id        : guid
          , masterId  : guid
          , note      : string
          , positions : {
                    head        : { id : guid, position : int, note : string } 
                  , transitions : [
                             { id : guid, position : int, note : string }
                           , { id : guid, position : int, note : string } 
                           , { id : guid, position : int, note : string } 
                           , { id : guid, position : int, note : string } 
                           , { id : guid, position : int, note : string } 
                           , { id : guid, position : int, note : string } 
                           , { id : guid, position : int, note : string } 
                           , { id : guid, position : int, note : string } 
                           // , Other transitions...
                          ]
             }
            }
          , { id : guid, masterId : guid, note : string, positions : {} }
          , { id : guid, masterId : guid, note : string, positions : {} }
          , { id : guid, masterId : guid, note : string, positions : {} }
          , { id : guid, masterId : guid, note : string, positions : {} }
          //, Other Servos ...
          ]
  }