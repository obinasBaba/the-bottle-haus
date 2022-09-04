import React, { FC, useState } from 'react';

export const CollectionsContext = React.createContext<any>({});

const CollectionsProvider: FC<{ children: React.ReactElement }> = (props) => {
  const [sortInfo, setSortInfo] = useState<any>({ refreshId: 0 });

  return <CollectionsContext.Provider value={{ sortInfo, setSortInfo }} {...props} />;
};

export default CollectionsProvider;
