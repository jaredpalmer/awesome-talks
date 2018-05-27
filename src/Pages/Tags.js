import Header from './../Components/Header'
import { Row, Grid } from 'react-styled-flexboxgrid'
import Query from './../Components/Query'
import Item from './../Components/Styling/Item'
import TAGS from '../Queries/TAGS'
import Slider from './../Components/Slider'
import Video from './../Components/Video'

const makeLink = name => `/category/${name.replace(/\s+/g, '-').toLowerCase()}`

export default () => (
  <Grid>
    <Header title="Categories" noSearch />
    <Query query={TAGS}>
      {({ data: { allTagses } }) => {
        return (
          <div>
            {allTagses.map(s => {
              const RowWrapper = s.videos.length > 3 ? Slider : Row
              return (
                <div key={s.id}>
                  <Item key={s.id} href={makeLink(s.name)}>
                    {s.name}
                  </Item>
                  <Row>
                    <RowWrapper>
                      {s.videos.map(v => {
                        return <Video key={v.id} speaker={v.speaker} {...v} />
                      })}
                    </RowWrapper>
                  </Row>
                </div>
              )
            })}
          </div>
        )
      }}
    </Query>
  </Grid>
)
