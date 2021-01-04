import React, {useEffect} from 'react'
import Layout from "../components/layout";

export default function Index() {
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC81Ljc5LjIzOS4yIiwiaWF0IjoxNTk3MDQxMTU0LCJuYmYiOjE1OTcwNDExNTQsImV4cCI6MTU5NzY0NTk1NCwiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiMSJ9fX0.CrT6kpBv1FDUB6cnObKQ7AoT7Nm3j_521uC8TVZ0TlI'
    useEffect(() => {
        fetch( 'http://5.79.239.2/wp-json/jwt-auth/v1/token/validate', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        } )

        fetch( 'http://5.79.239.2/wp-json/jwt-auth/v1/token', {
            method: 'POST',
            body: JSON.stringify( {
                // Username of a user on the WordPress website in which the REST API request
                // is being made to.
                username: 'iksent',
                // And the above user's password.
                password: 'iksent'
            } ),
            headers: {
                'Content-Type': 'application/json'
            }
        } )
            .then( res => res.json() )
            .then( res => {
                console.log('TOKEN', res)
                if (res.token) {
                    const userID = res.user_id

                    fetch( `http://5.79.239.2/wp-json/wp/v2/users/${userID}`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    } )
                        .then( res => res.json() )
                        .then( res => {
                            console.log('GET USER', res)

                            fetch( `http://5.79.239.2/wp-json/acf/v3/users/${userID}`, {
                                method: 'GET',
                            } )
                                .then( res => res.json() )
                                .then( res => {
                                    console.log('ACF USER', res)
                                })

                        })
                }
            } );
    }, [])

    return (
        <Layout>
            Test
        </Layout>
    )
}