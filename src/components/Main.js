import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'

import About from './About'
import Team from './Team'
import Blog from './Blog'
import Support from './Support'
import Logo from './Logo'
import mainStyles from './styles/Main.module.scss'

const Main = (props) => {
    const articles = useStaticQuery(graphql`
    query {
        allMarkdownRemark (
            filter: { frontmatter: { class: { eq: "article" } } }
        ) {
            edges {
                node {
                    html
                    frontmatter {
                        title
                        index
                    }
                }
            }
        }
    }
    `)

    //              |
    //do zrobienia \|/ 

    const Components = {
        about: About,
        team: Team,
        blog: Blog,
        support: Support
    }

    return (
        <main className={mainStyles.main}>
            <Logo />
            <div id="main" className={mainStyles.background}>
                <div id="sheet" className={mainStyles.sheet}>
                    {articles.allMarkdownRemark.edges.sort((a, b) => {return a.node.frontmatter.index - b.node.frontmatter.index}).map(v => {
                        const Comp = Components[v.node.frontmatter.title]
                        if(props.blog) {
                            if(v.node.frontmatter.title === "blog") {
                                console.log('in')
                                return (
                                    <Comp
                                    key={v.node.frontmatter.index}
                                    html={v.node.html} 
                                    title={v.node.frontmatter.title}
                                    />
                                )
                            } else {
                                return null
                            }
                        } else {
                            return (
                                <Comp
                                    key={v.node.frontmatter.index}
                                    html={v.node.html} 
                                    title={v.node.frontmatter.title}
                                />
                            )
                        }
                    })}
                </div>
            </div>
        </main>
    )
}

export default Main