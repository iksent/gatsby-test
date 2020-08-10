import React, {useState} from "react"

import {Link} from "gatsby"
import {Box, Heading} from "@chakra-ui/core"
import Img from "gatsby-image"
import Layout from "../../components/layout"
import {normalizePath} from "../../utils/get-url-path"

function BlogPost({data}) {
    const {nextPage, previousPage, page} = data
    const {title, content, featuredImage} = page
    const [counter, setCounter] = useState(0)

    return (
        <Layout>
            <Heading
                as="h1"
                size="xl"
                mb={5}>
                {title}
            </Heading>

            {!!featuredImage?.node?.remoteFile?.childImageSharp && (
                <Box mb={5}>
                    <Img fluid={featuredImage.node.remoteFile.childImageSharp.fluid}/>
                </Box>
            )}

            <p dangerouslySetInnerHTML={{__html: content}}/>

            <button
                aria-label="Button"
                onClick={() => setCounter(p => p + 1)}>
                Test
            </button>
            <div>{counter}</div>

            <br/>
            {!!nextPage && (
                <Link to={normalizePath(nextPage.uri)}>Next: {nextPage.title}</Link>
            )}
            <br/>
            {!!previousPage && (
                <Link to={normalizePath(previousPage.uri)}>
                    Previous: {previousPage.title}
                </Link>
            )}
        </Layout>
    )
}

export default BlogPost
