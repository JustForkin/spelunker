import React from 'react';
import gql from 'graphql-tag';

import Box, { Tab, TabbedBox } from '../../Box';
import Currency from '../../formatters/Currency';
import Query from '../../Query';

import DroppedByTab from './tabs/DroppedBy';
import ItemReference from './Reference';
import SoldByTab from './tabs/SoldBy';

const fetchItem = gql`
  query($id: Int!) {
    item(id: $id) {
      id
      name
      buyPrice
      sellPrice
      quality
      displayInfo {
        icon
      }
      droppedBy {
        totalCount
      }
      soldBy {
        totalCount
      }
    }
  }
`;

const Item = ({ match }) => {
  const { id } = match.params;
  return (
    <Query query={fetchItem} variables={{ id }}>
      {({ data }) => {
        const { item } = data;
        const {
          droppedBy: { totalCount: droppedByCount },
          soldBy: { totalCount: soldByCount },
        } = item;

        return (
          <div>
            <Box>
              <legend>
                <ItemReference item={item} link={false} />
              </legend>

              {item.buyPrice > 0 && (
                <p>
                  Cost: <Currency value={item.buyPrice} />
                </p>
              )}

              {item.sellPrice > 0 && (
                <p>
                  Sells for: <Currency value={item.sellPrice} />
                </p>
              )}
            </Box>

            <TabbedBox>
              {droppedByCount > 0 && <Tab
                label={`Dropped by (${droppedByCount})`}
                component={DroppedByTab}
                path="dropped-by"
                match={match}
              />}

              {soldByCount > 0 && <Tab
                label={`Sold by (${soldByCount})`}
                component={SoldByTab}
                path="sold-by"
                match={match}
              />}
            </TabbedBox>
          </div>
        );
      }}
    </Query>
  );
};

export default Item;