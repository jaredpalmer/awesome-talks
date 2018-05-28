import React, { Component } from 'react'
import styled, { injectGlobal } from 'styled-components'
import is from 'styled-is'
import { Col } from 'react-styled-flexboxgrid'
import Flex from 'styled-flex-component'
import { Link } from 'react-router-dom'
import { createPortal } from 'react-dom'
import LazyLoad from 'react-lazyload'
import remcalc from 'remcalc'

import Tag from './Styling/Tag'
import Player from './Player'

const Button = styled.button`
  background: transparent;
  display: block;
  border: none;
  color: #d62d22;
  font-weight: bold;
  text-align: right;
  padding: 0;
`

const Speaker = styled.p`
  padding-left: ${remcalc(20)};
  a {
    min-width: ${remcalc(50)};
    display: block;
    padding: ${remcalc(5)};
    text-align: center;

    &:after {
      left: 0;
    }
  }
`

const Name = styled.h2`
  font-size: 400;
  font-size: ${remcalc(22)};
  color: ${props => props.theme.black};
  letter-spacing: ${remcalc(-0.63)};
`

const Description = styled.p`
  opacity: 0.8;
  font-family: Montserrat-Light;
  font-size: ${remcalc(14)};
  color: ${props => props.theme.black};
  letter-spacing: ${remcalc(0.11)};
  line-height: ${remcalc(21)};
`

const Column = styled(Col)`
  transition: all 200ms ease;
  justify-content: center;
  margin: 0 auto;
  margin-bottom: ${remcalc(40)};

  ${is('cinemaMode')`
    position: fixed;
    z-index: 9999;
    top: 10%;
    width: 90%;
    left: 50%;
    transform: translateX(-50%);
    background: ${props => props.theme.white};
    padding: ${remcalc(20)};
    max-height: 90%;
    overflow: scroll;
    padding-bottom: ${remcalc(50)};
  `};
`

const Overlay = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
`

injectGlobal`
  body.cinema-mode {
      overflow: hidden;
  }
`

const makeLink = (url = 'speaker', name = 'FIX ME') =>
  `/${url}/${name.replace(/\s+/g, '-').toLowerCase()}`

class VideoWarpper extends Component {
  state = { cinemaMode: false, showVideo: false }

  toggleCinemaMode = () => {
    this.setState(({ cinemaMode }) => ({
      cinemaMode: !cinemaMode,
      showVideo: true
    }))
    document.body.classList.toggle('cinema-mode', this.state.cinemaMode)
  }

  showVideo = () => {
    this.setState(({ showVideo }) => ({
      showVideo: true
    }))
  }

  endVideo = id => {
    this.props.addWatched(id)
    this.setState(({ showVideo }) => ({
      showVideo: false
    }))
  }

  videoTitle = name => {
    if (name.length > 100) return `${name.substring(0, 100)}...`
    return name
  }

  render = () => {
    const { speaker, description, link, name, tags, id } = this.props
    return (
      <Column
        cinemaMode={this.state.cinemaMode}
        md={this.state.cinemaMode ? 12 : 4}
        sm={this.state.cinemaMode ? 12 : 6}
        xs={9}
      >
        <Player
          showVideo={this.state.showVideo}
          cinemaMode={this.state.cinemaMode}
          id={id}
          onClick={this.showVideo}
          link={link}
          name={name}
          onEnd={() => this.endVideo(id)}
        />
        <Flex justifyBetween alignCenter>
          <Name>{this.videoTitle(name)}</Name>
          <Speaker>
            {speaker.map(s => (
              <Link key={s.id} to={makeLink('speaker', s.name)}>
                <span>{s.name}</span>
              </Link>
            ))}
          </Speaker>
        </Flex>
        <Flex>
          {tags.map(s => (
            <Tag key={s.id} to={makeLink('category', s.name)}>
              #{s.name.toLowerCase()}
            </Tag>
          ))}
        </Flex>

        <Button name="Toggle Cinema Mode" onClick={this.toggleCinemaMode}>
          {this.state.cinemaMode ? 'Turn Off' : 'Turn On'} Cinema Mode
        </Button>

        {this.state.cinemaMode && description ? (
          <Description>{description}</Description>
        ) : null}

        {this.state.cinemaMode
          ? createPortal(
              <Overlay onClick={this.toggleCinemaMode} />,
              document.getElementsByTagName('body')[0]
            )
          : null}
      </Column>
    )
  }
}

export default ({ noLazy = false, talk }) =>
  noLazy ? (
    <VideoWarpper {...talk} />
  ) : (
    <LazyLoad height={310}>
      <VideoWarpper {...talk} />
    </LazyLoad>
  )
