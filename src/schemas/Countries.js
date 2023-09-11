import { gql } from '@apollo/client';

function Countries() {

    const query = gql`
        query Query {
            countries {
                code
                name
                phone
                emoji
                currency
                native
    }
  }  
  `

  return query;
}

export default Countries
