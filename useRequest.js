import  {  useQuery  }  from  '@apollo/client'; 
 
export  default  function  useRequest(gqlQuery,  id)  {
 const { data,  loading,  error } =  useQuery(gqlQuery,  {
 variables:  { id:  id  }
});
 
return  {  loading,  error,  data  };
}