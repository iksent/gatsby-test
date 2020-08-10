import React, {useEffect} from 'react'
import Layout from "../components/layout";

export default function Index() {
    useEffect(() => {
        fetch( 'http://test.local/wp-json/jwt-auth/v1/token/validate', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC90ZXN0LmxvY2FsIiwiaWF0IjoxNTk3MDM3NDA2LCJuYmYiOjE1OTcwMzc0MDYsImV4cCI6MTU5NzY0MjIwNiwiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiMSJ9fX0.p7p5ZL71GFARo5JOeiXln5MCcjIplWNE5HcikKcBRxA',
                'Content-Type': 'application/json'
            }
        } )

        fetch( 'http://test.local/wp-json/jwt-auth/v1/token', {
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

                    fetch( `http://test.local/wp-json/wp/v2/users/${userID}`, {
                        method: 'GET',
                    } )
                        .then( res => res.json() )
                        .then( res => {
                            console.log('GET USER', res)

                            fetch( `http://test.local/wp-json/acf/v3/users/${userID}`, {
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