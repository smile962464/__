import { Carousel, Flex } from 'antd-mobile';

export default class My extends React.Component{
  render() {
    const settings = {
      dots: true,
      autoplay: true,
      infinite: true,
      selectedIndex: 2,
      beforeChange: (from, to) => {
        console.log(`slide from ${from} to ${to}`);
      },
      afterChange: (index) => {
        console.log('slide to', index);
      },
    };
    return (
      <Carousel {...settings}>
        <Flex
          justify="center"
          style={{ height: 360 }}
        >
          <h3>Carousel 1</h3>
        </Flex>
        <Flex
          justify="center"
          style={{ height: 360 }}
        >
          <h3>Carousel 2</h3>
        </Flex>
        <Flex
          justify="center"
          style={{ height: 360 }}
        >
          <h3>Carousel 3</h3>
        </Flex>
      </Carousel>
    );
  }
}
