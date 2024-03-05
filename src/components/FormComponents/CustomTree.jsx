import {Tree} from "antd";


const CustomTree = ({onExpand, expandedKeys, handleSelect, selectedKeys, treeData}) => {

    return (

        <Tree
            className="draggable-tree"
            onExpand={onExpand}
            expandedKeys={expandedKeys}
            onSelect={handleSelect}
            selectedKeys={selectedKeys}
            treeData={treeData}
        />

    );
};

export default CustomTree;
