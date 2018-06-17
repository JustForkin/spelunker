import React from 'react';
import gql from 'graphql-tag';

import Collection from '../../../Collection';
import Table, { PlaceholderColumn, prefixAccessors } from '../../../Table';
import npcColumns from '../../NPC/columns';

const listSoldByForItem = gql`
  query($id: Int!, $offset: Int) {
    item(id: $id) {
      id
      soldBy(offset: $offset) {
        totalCount
        results {
          maxCount
          restockTime
          npc {
            ...npcColumns
          }
        }
      }
    }
  }

  ${npcColumns.fragment}
`;

const SoldByTab = ({ match }) => {
  const { id } = match.params;
  return (
    <Collection
      accessor="item.soldBy"
      query={listSoldByForItem}
      variables={{ id }}
    >
      {({ results }) => (
        <Table
          data={results}
          keyField="npc.id"
          columns={[
            ...prefixAccessors(npcColumns, 'npc'),
            <PlaceholderColumn label="Max count" />,
            <PlaceholderColumn label="Restock time" />,
          ]}
        />
      )}
    </Collection>
  );
};

export default SoldByTab;
