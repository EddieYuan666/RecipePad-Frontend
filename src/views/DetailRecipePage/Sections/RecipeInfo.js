import React, { useEffect, useState } from 'react';
import Axios from 'axios'
import { Popover, Button, Descriptions, Image, Layout, Divider, Row, Col, List, Typography  } from 'antd';
import { HeartTwoTone, getTwoToneColor, setTwoToneColor } from '@ant-design/icons';

import { useSelector } from 'react-redux';

const BASE_IMAGE_URL = "https://recipepadblob.blob.core.windows.net/images/"


function RecipeInfo(props) {
  const [author, setAuthor] = useState()
  const user = useSelector((state) => state.user);
  const ingredients = [];

  for (var i in props.Recipe.ingredients) {
    ingredients.push([i, props.Recipe.ingredients[i]]);
  }

  useEffect(() => {
    console.log(props.Recipe)
    Axios.get(`/profile/${props.Recipe.uid}`).then(
      (response) => {
        // console.log(response.data)
        setAuthor(response.data.nickname)
      }
    )
    
  }, [props.Recipe.uid]);

  const addToBookmarkhandler = () => {
    if (user.userData && !user.userData.isAuth) {
      alert('Please Log in first');
      return props.parent.history.push('/login');
    }
    props.addToBookmark(props.Recipe.rid);
    alert('Recipe Bookmarked');
  };

  const handleFollow = () => {
    Axios.put(`/follow/${window.localStorage.userId}/${props.Recipe.uid}`).then(
      _ => {
        alert("Follow Success")
      }
    )
  }

  const handleUnFollow = () => {
    Axios.delete(`/follow/${window.localStorage.userId}/${props.Recipe.uid}`).then(
      _ => {
        alert("UnFollow Success")
      }
    )
  }

  return (
  <div>
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          size='large'
          shape='round'
          type='danger'
          onClick={addToBookmarkhandler}
        >
          <HeartTwoTone twoToneColor="#eb2f96" />
        </Button>
      </div>
    <Row>
      <Col span={8}></Col>
      <Col span={8}>
        <img
          width={400}
          src={BASE_IMAGE_URL + props.Recipe.cover_imgid}
        />
      </Col>
      <Col span={8}></Col>
    </Row>
    <Row>
    <Col span={8}></Col>
    <Col span={8}>
      <h1> {props.Recipe.title}
      </h1>
    </Col>
  </Row>
  <Row>
    <Col span={9}></Col>
    <Col span={8}> 
      <h3> Created By: &nbsp; {author} </h3>
      <Button type="primary" ghost onClick={handleFollow}>
        Follow
      </Button>
      &nbsp; &nbsp; &nbsp;
      <Button type="danger" danger ghost onClick={handleUnFollow}>
        Unfollow
      </Button>
    </Col>
  </Row>
  <Row>
    <Col span={4}></Col>
    <Col span={16}>
      <List
        header="Ingredients"
        bordered
        dataSource={ingredients}
        renderItem={item => (
          <List.Item>
            {item[0] + " " + item[1]}
          </List.Item>
        )}
      />
    </Col>
    <Col span={4}></Col>
  </Row>
  <Row>
    <Col span={4}></Col>
    <Col span={16}>
      <List
        size="large"
        header="Steps"
        bordered
        dataSource={props.Recipe.steps}
        renderItem={item => (
          <List.Item>
            <h1>
            {item.title}
            </h1>
            <br></br>
            <img
              width={272}
              src={BASE_IMAGE_URL + item.image_id}
            />
            <br></br>
          {item.detail}
          </List.Item>
        )}
      />
    </Col>
    <Col span={4}></Col>
  </Row>

  </div>
  );
}
export default RecipeInfo;
