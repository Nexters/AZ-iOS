import React from 'react';
import styled from 'styled-components/native';
import Layout from '~/constants/Layout';
import { Text, Colbox } from '../Atoms';
import { WHITE, PURPLE } from '~/constants/Colors';
import HorizontalBar from '../Atoms/HorizontalBar';

const Touchable = styled.TouchableOpacity``;
const Notification = styled.View`
  flex-direction: row;
  min-height: 100px;
  padding-left: ${`${Layout.width / 18}px`};
  padding-right: ${`${Layout.width / 18}px`};
  margin-bottom: 20px;
`;
const LeftArea = styled.View`
  flex: 1;
  align-items: center;
`;
const RightArea = styled.View`
  flex: 3;
`;
const Type = styled.View`
  justify-content: center;
  align-items: center;
  margin-top: 33px;
  width: 55px;
  height: 25px;
  border-radius: 100px;
  background-color: #b029df;
`;

type NotiCardProps = {
  type: '좋아요' | '댓글';
  content: string;
  description: string;
  createdAt: string;
  onPress: () => void;
};

const NotiCard = ({ onPress, type, content, description, createdAt }: NotiCardProps) => {
  return (
    <Touchable onPress={onPress} activeOpacity={0.7}>
      <Notification>
        <LeftArea>
          <Type>
            <Text text={type} color={WHITE} fontSize="12px" fontWeight={800} />
          </Type>
        </LeftArea>
        <RightArea>
          <Colbox marginTop="20px">
            <Text fontSize="16px" text={content} fontWeight={800} color={WHITE} />
            <Text
              fontSize="14px"
              text={description}
              fontWeight={300}
              color={WHITE}
              marginTop="6px"
            />
            <Text
              fontSize="12px"
              text={createdAt}
              fontWeight={300}
              color={WHITE}
              marginTop="14px"
            />
          </Colbox>
        </RightArea>
      </Notification>
      <HorizontalBar height="1px" color={PURPLE} />
    </Touchable>
  );
};

export default NotiCard;
