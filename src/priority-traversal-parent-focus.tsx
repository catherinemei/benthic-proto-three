import {
  For,
  createSignal,
  Show,
  createMemo,
  onMount,
  onCleanup,
} from "solid-js";
import {
  TraversalOutputProps,
  HypergraphNodeProps,
} from "./priority-traversal-types";

/**
 * Component to output the traversal structure to the DOM
 * Contains both the visualization for the traversal structure (optional) and
 * also screen reader output for traversal structure
 */
export function TraversalOutputComponentKeyboardParentFocus(
  props: TraversalOutputProps
) {
  const [currentNodeId, setCurrentNodeId] = createSignal<string | null>(
    props.nodeGraph[0].id
  );

  // Keeps track of traversal history for undo
  const [history, setHistory] = createSignal<string[]>(["0"]);

  // This will store the default paths from the root node to each node
  const [defaultPaths, setDefaultPaths] = createSignal<Map<string, string[]>>(
    new Map()
  );

  const currentNode = createMemo(() => {
    if (currentNodeId() !== null) {
      return props.nodeGraph[currentNodeId()!];
    }
    return props.nodeGraph[0]; // Default to the first node if none is selected
  });

  const calculateParentIndex = () => {
    const parents = props.nodeGraph[currentNodeId()!].parents;
    const previousNodeId = history()[history().length - 2];
    return parents.indexOf(previousNodeId);
  };

  const findAllSiblingsOfNode = (nodeId: string) => {
    const parents = props.nodeGraph[nodeId].parents;
    const siblings = new Set<string>();
    for (const parentId of parents) {
      for (const childId of props.nodeGraph[parentId].children) {
        siblings.add(childId);
      }
    }
    return siblings;
  };

  const handleNodeClick = (oldId: string, newId: string) => {
    if (oldId === newId) {
      return;
    }

    const newNodeSiblings = findAllSiblingsOfNode(newId);

    if (newNodeSiblings.has(oldId)) {
      // If old and new ID are on same level (siblings)
      // then pop most recent history node and add new node
      const curHistory = history();
      curHistory.pop();
      setHistory([...curHistory, newId]);
    } else if (props.nodeGraph[oldId].parents.includes(newId)) {
      // If new node is a parent of the old node
      // Then use the default path to the new node as new history
      const defaultPath = defaultPaths().get(newId);
      setHistory([...(defaultPath ?? ["0"])]);
    } else if (props.nodeGraph[oldId].children.includes(newId)) {
      // If new node is a child of the old node
      // Then add new node to the history
      setHistory((prev) => [...prev, newId]);
    }

    setCurrentNodeId(newId);

    // Moves screen reader focus
    setTimeout(() => {
      const newNode = document.getElementById(`info-${newId}`);

      if (newNode) {
        if (!newNode.hasAttribute("tabindex")) {
          newNode.setAttribute("tabindex", "0");
        }
        newNode.focus();
      }
    }, 0);
  };
  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === "ArrowUp" && event.shiftKey) {
      const focusedElement = document.activeElement as HTMLElement;
      const focusedElementId = focusedElement?.id;
      // Navigate up through the parent focus using history
      const historyList = history();
      if (focusedElementId.startsWith("children")) {
        // Only occurs when node contains no children
        // then Shift + ArrowUp returns to current node in focus
        const currentNode = document.getElementById(`info-${currentNodeId()}`);
        if (currentNode) {
          currentNode.focus();
        }
      } else if (historyList.length > 2) {
        const curNodeId = historyList.pop();
        const parentNodeId = historyList[historyList.length - 1];
        const grandParentNodeId = historyList[historyList.length - 2];

        // Check if grandparent node is a valid parent of parent node
        if (
          grandParentNodeId &&
          props.nodeGraph[parentNodeId!].parents.includes(grandParentNodeId)
        ) {
          setHistory([...historyList]);
          setCurrentNodeId(parentNodeId);
        } else {
          // update history to be default path up to parent node
          const defaultPath = defaultPaths().get(parentNodeId!);
          setHistory([...(defaultPath ?? ["0"])]);
          setCurrentNodeId(parentNodeId);
        }

        const parentNodeElement = document.getElementById(
          `info-${parentNodeId}`
        );

        if (parentNodeElement) {
          parentNodeElement.focus();
        }
      } else if (historyList.length > 1) {
        const curNodeId = historyList.pop();
        const previousNodeId = historyList[historyList.length - 1];
        if (previousNodeId) {
          setHistory([...historyList]); // Update history without the last node
          setCurrentNodeId(previousNodeId);

          const previousNodeElement = document.getElementById(
            `info-${previousNodeId}`
          );
          if (previousNodeElement) {
            previousNodeElement.focus();
          }
        }
      } else {
        const parentSection = document.getElementById(`parents-group`);
        parentSection?.focus();
      }
      event.preventDefault();
    } else if (event.key === "ArrowDown" && event.shiftKey) {
      const focusedElement = document.activeElement as HTMLElement;
      const focusedElementId = focusedElement?.id;

      if (focusedElementId.startsWith("parents")) {
        const currentNode = document.getElementById(`info-${currentNodeId()}`);
        if (currentNode) {
          currentNode.focus();
        }
      } else {
        // Directly navigate to first child if children exist
        // If not, then select entire group and announce that no children exist
        const firstChildId = props.nodeGraph[currentNodeId()!].children[0];
        if (firstChildId) {
          // update history list with traversed children node
          setHistory((prev) => [...prev, firstChildId]);

          setCurrentNodeId(firstChildId);

          const newSection = document.getElementById(`info-${firstChildId}`);
          if (newSection) {
            newSection.focus();
          }
        } else {
          const childSection = document.getElementById(`children-group`);
          if (childSection) {
            childSection.focus();
          }
        }
      }
      event.preventDefault();
    } else if (event.key === "h") {
      const titleSection = document.getElementById(`home`);

      const lastNodeId = history()[history().length - 1];
      const lastNodeButton = document.getElementById(`info-${lastNodeId}`);

      if (lastNodeButton) {
        lastNodeButton.focus();
      } else {
        titleSection?.focus();
      }
    } else if (event.key === "p") {
      const parents = props.nodeGraph[currentNodeId()!].parents;
      if (parents.length > 0) {
        // Get the current parent index from history, and cycle to the next parent
        let parentIndex = calculateParentIndex();
        let nextIndex = (parentIndex + 1) % parents.length;

        const nextParentId = parents[nextIndex];
        let curHistory = history();
        const curNodeId = curHistory.pop();
        const oldParent = curHistory.pop();
        setHistory((prev) => [...curHistory, nextParentId, currentNodeId()!]);

        const parentContext = document.getElementById("parent-context");
        const curNodeSection = document.getElementById(`info-${curNodeId}`);

        if (parentContext) {
          parentContext.innerHTML = `Grouping by ${props.nodeGraph[nextParentId].displayName}`;
          parentContext.setAttribute(
            "aria-label",
            `Grouping by ${props.nodeGraph[nextParentId].displayName}`
          );
          parentContext.focus();
        }

        setTimeout(() => {
          if (curNodeSection) {
            curNodeSection.focus();
          }
        }, 1500);
      }
      event.preventDefault();
    } else if (event.key === "Backspace") {
      setHistory((prev) => {
        const newHistory = [...prev];
        const currentNode = newHistory.pop();
        const previousNodeId = newHistory[newHistory.length - 1];

        if (previousNodeId) {
          // used to announce undo action
          const undoMessage = document.getElementById("undo-text");
          if (undoMessage) {
            undoMessage.focus();
          }

          setCurrentNodeId(previousNodeId);

          // reset focus to previous node after announcement
          setTimeout(() => {
            const newNode = document.getElementById(`info-${previousNodeId}`);
            if (newNode) {
              newNode.focus();
            }
          }, 800);
        }
        return newHistory;
      });
    } else if (
      event.key === "ArrowLeft" ||
      event.key === "ArrowRight" ||
      event.key === "ArrowUp" ||
      event.key === "ArrowDown"
    ) {
      const focusedElement = document.activeElement as HTMLElement;
      const focusedElementId = focusedElement?.id;

      if (focusedElementId.startsWith("info-") || focusedElementId === "home") {
        const elmInGroup = Array.from(
          document.querySelectorAll(`#home li`)
        ) as HTMLElement[];

        const currentIndex = elmInGroup.indexOf(focusedElement);
        let newIndex = currentIndex;

        if (
          (event.key === "ArrowLeft" || event.key === "ArrowUp") &&
          currentIndex > 0
        ) {
          newIndex = currentIndex - 1;
        } else if (
          (event.key === "ArrowRight" || event.key === "ArrowDown") &&
          currentIndex < elmInGroup.length - 1
        ) {
          newIndex = currentIndex + 1;
        }

        const newNodeId = elmInGroup[newIndex]?.id.split("info-")[1];
        if (newNodeId) {
          const historyList = history();
          const previousAdjNode = historyList.pop();
          setHistory([...historyList, newNodeId]);
          setCurrentNodeId(newNodeId);
        }
        elmInGroup[newIndex]?.focus();

        event.preventDefault();
      } else {
        event.preventDefault();
      }
    } else {
      event.preventDefault();
    }

    const parentContext = document.getElementById("parent-context");
    if (parentContext) {
      if (history().length > 1) {
        parentContext.innerHTML = `Grouping by ${
          props.nodeGraph[history()[history().length - 2]].displayName
        }`;
        parentContext.setAttribute(
          "aria-label",
          `Grouping by ${
            props.nodeGraph[history()[history().length - 2]].displayName
          }`
        );
      } else {
        parentContext.innerHTML = `No context`;
        parentContext.setAttribute("aria-label", `No context`);
      }
    }
  };

  onMount(() => {
    const paths = calculateDefaultPaths(props.nodeGraph);
    setDefaultPaths(paths);

    window.addEventListener("keydown", handleKeyPress);
  });

  onCleanup(() => {
    window.removeEventListener("keydown", handleKeyPress);
  });

  return (
    <Show when={currentNodeId()}>
      <HypergraphNodeComponentKeyboardOnly
        history={history()}
        node={currentNode()}
        nodeGraph={props.nodeGraph}
        onNodeClick={handleNodeClick}
      />
    </Show>
  );
}

/**
 * Component to output a single node in the hypergraph
 * Screen reader output for single node in traversal structure
 */
export function HypergraphNodeComponentKeyboardOnly(
  props: HypergraphNodeProps
) {
  // based on the parent node in focus, siblings are the child nodes of that parent
  // history can be found as props.history
  function findSiblings(currentId: string) {
    if (!props.history || props.history.length < 2) {
      return [currentId];
    } else {
      const parentFocus = props.history[props.history.length - 2];
      const siblings = props.nodeGraph[parentFocus].children;
      return siblings;
    }
  }

  const sortedParents = createMemo(() =>
    props.node.parents
      .map((parentId) => props.nodeGraph[parentId])
      .sort((a, b) => a.priority - b.priority)
  );

  const collectParentNames = createMemo(() => {
    return sortedParents()
      .map((parentNode) => parentNode.descriptionTokens?.label)
      .join(", ");
  });

  const sortedChildren = createMemo(() =>
    props.node.children
      .map((childId) => props.nodeGraph[childId])
      .sort((a, b) => a.priority - b.priority)
  );

  const collectChildrenNames = createMemo(() => {
    return sortedChildren()
      .map((childNode) => childNode.descriptionTokens?.label)
      .join(", ");
  });

  const sortAdjacents = createMemo(() => {
    const adjacentNodeIds = findSiblings(props.node.id);

    const adjacentNodes = Array.from(adjacentNodeIds)
      .map((nodeId) => props.nodeGraph[nodeId])
      .sort((a, b) => {
        // First, sort by priority (high to low)
        const priorityDifference = a.priority - b.priority;
        if (priorityDifference !== 0) {
          return priorityDifference;
        }
        // If priorities are the same, sort by ID (lexicographical order)
        return Number(a.id) - Number(b.id);
      });

    return adjacentNodes;
  });

  return (
    <div>
      <ul id="parent-context" tabindex="0" aria-label="No context">
        <span aria-hidden={true}>No context</span>
      </ul>

      <ul
        id="parents-group"
        aria-label={
          props.node.parents.length == 0
            ? `${props.node.displayName} belongs to 0 groups`
            : `${props.node.displayName} belongs to (${collectParentNames()})`
        }
        tabindex="0"
      >
        <span style={{ "font-weight": "bold" }}>Belongs to</span>
        <For each={sortedParents()}>
          {(parent, idx) => (
            <li
              id={`parents-${props.node.id}-${idx()}`}
              aria-label={`${parent.displayName} group`}
              onClick={() => props.onNodeClick(props.node.id, parent.id)}
            >
              <span aria-hidden="true">{parent.displayName} group</span>
            </li>
          )}
        </For>
      </ul>

      <ul id="home" tabindex="0" aria-live="assertive">
        <For
          each={sortAdjacents()}
          fallback={<li style={{ color: "grey" }}>None</li>}
        >
          {(adjacent, idx) => (
            <li
              aria-label={`Node ${idx() + 1} of ${sortAdjacents().length}; ${
                adjacent.displayName
              }; ${adjacent.descriptionTokens?.longDescription}`}
              id={`info-${adjacent.id}`}
              onClick={() => props.onNodeClick(props.node.id, adjacent.id)}
              tabindex="0"
            >
              <span aria-hidden="true">{`${adjacent.displayName}; ${adjacent.descriptionTokens?.longDescription}`}</span>
            </li>
          )}
        </For>
      </ul>

      <ul
        id="children-group"
        aria-label={
          props.node.children.length === 0
            ? `${props.node.displayName} contains no nodes`
            : `${props.node.displayName} contains (${collectChildrenNames()})`
        }
        tabindex="0"
      >
        <span style={{ "font-weight": "bold" }} aria-hidden={true}>
          Contains
        </span>
        <For each={sortedChildren()}>
          {(child, idx) => (
            <li
              id={`children-${props.node.id}-${idx()}`}
              aria-label={child.displayName}
              onClick={() => props.onNodeClick(props.node.id, child.id)}
            >
              <span aria-hidden="true">{child.displayName}</span>
            </li>
          )}
        </For>
      </ul>

      <ul id="undo-text" tabindex="0" aria-label="Pressing Undo">
        <span style={{ "font-weight": "bold" }} aria-hidden={true}>
          Pressing Undo
        </span>
      </ul>
    </div>
  );
}

/**
 * Function to calculate the shortest path from root (node "0") to all other nodes.
 * This function uses BFS to explore the graph and generates a map of default paths.
 */
function calculateDefaultPaths(
  nodeGraph: Record<string, any>,
  rootId: string = "0"
) {
  const defaultPaths = new Map<string, string[]>();
  const queue: [string, string[]][] = [[rootId, [rootId]]]; // Tuple of [currentNode, path to currentNode]

  while (queue.length > 0) {
    const [currentNodeId, pathToCurrent] = queue.shift()!;

    // If this node is already visited, skip it
    if (defaultPaths.has(currentNodeId)) continue;

    // Store the path to the current node
    defaultPaths.set(currentNodeId, pathToCurrent);

    // Explore the children of the current node and continue BFS
    const children = nodeGraph[currentNodeId].children;
    for (const childId of children) {
      if (!defaultPaths.has(childId)) {
        queue.push([childId, [...pathToCurrent, childId]]);
      }
    }
  }

  return defaultPaths;
}
