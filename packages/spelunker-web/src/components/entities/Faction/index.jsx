import React from 'react';
import gql from 'graphql-tag';

import { Box, Query, List, ListItem, Tab, TabbedBox, Title } from '../../core';

import FactionReference from './Reference';
import ObjectiveOfTab from './tabs/ObjectiveOf';
import SubfactionsTab from './tabs/Subfactions';

const fetchFaction = gql`
  query($id: Int!) {
    faction(id: $id) {
      ...FactionReference
      description
      parent {
        id
        name
      }

      objectiveOf {
        totalCount
      }
      subfactions {
        totalCount
      }
    }
  }

  ${FactionReference.fragment}
`;

const Faction = ({ match }) => {
  const { id } = match.params;
  return (
    <Query query={fetchFaction} variables={{ id }}>
      {({ data }) => {
        const { faction } = data;
        const {
          name,
          description,
          parent,
          objectiveOf: { totalCount: objectiveOfCount },
          subfactions: { totalCount: subfactionCount },
        } = faction;
        return (
          <Title path={[name, 'Factions']}>
            <Box>
              <h1>
                <FactionReference faction={faction} />
              </h1>

              <p>
                {description}
              </p>

              {parent && (
                <List>
                  <ListItem>
                    Part of <FactionReference faction={parent} />
                  </ListItem>
                </List>
              )}
            </Box>

            <TabbedBox>
              {subfactionCount > 0 && <Tab
                label={`Sub-factions (${subfactionCount})`}
                component={SubfactionsTab}
                path="sub-factions"
                match={match}
              />}

              {objectiveOfCount > 0 && <Tab
                label={`Objective of (${objectiveOfCount})`}
                component={ObjectiveOfTab}
                path="objective-of"
                match={match}
              />}
            </TabbedBox>
          </Title>
        );
      }}
    </Query>
  );
};

export default Faction;
