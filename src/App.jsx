import React, { useState } from "react";
import "./styles.css";
import { InputTodo } from "./components/InputTodo";
import { IncompleteTodos } from "./components/IncompleteTodos";
import { CompleteTodos } from "./components/CompleteTodos";

export const App = () => {
  const [todoText, setTodoText] = useState("");
  const [inCompleteTodos, setInCompleteTodos] = useState([]);
  const [completeTodos, setCompleteTodos] = useState([]);

  // 入力ボタン
  const onChangeTodoText = (event) => setTodoText(event.target.value);
  const onClickAdd = () => {
    // inputのvalueが空の場合、処理しない
    if (todoText === "") return;
    // 配列の複製＋inputで入力した値を配列に追加
    const newTodos = [...inCompleteTodos, todoText];
    // 配列を渡す
    setInCompleteTodos(newTodos);
    // 追加後inputのvalueを空にする
    setTodoText("");
  };

  // 削除ボタン
  const onClickDelete = (index) => {
    // 未完了TODOの配列を複製
    const newTodos = [...inCompleteTodos];
    //削除ボタンが押された要素のみ削除
    newTodos.splice(index, 1);
    // 配列を渡す
    setInCompleteTodos(newTodos);
  };

  // 完了ボタン
  const onClickComplete = (index) => {
    // 未完了TODOの配列を複製
    const newInCompleteTodos = [...inCompleteTodos];
    //完了ボタンが押された要素のみ削除
    newInCompleteTodos.splice(index, 1);

    //完了TODOの配列を複製+完了となった要素を追加
    const newCompleteTodos = [...completeTodos, inCompleteTodos[index]];
    setInCompleteTodos(newInCompleteTodos);
    setCompleteTodos(newCompleteTodos);
  };

  // 戻るボタン
  const onClickBack = (index) => {
    // 完了TODOの配列を複製
    const newCompleteTodos = [...completeTodos];
    // 戻るボタンが押された要素を削除
    newCompleteTodos.splice(index, 1);

    // 未完了のTODOに追加
    const newIncompleteTodos = [...inCompleteTodos, completeTodos[index]];
    setInCompleteTodos(newIncompleteTodos);
    setCompleteTodos(newCompleteTodos);
  };

  return (
    <>
      <InputTodo
        todoText={todoText}
        onChange={onChangeTodoText}
        onClick={onClickAdd}
        disabled={inCompleteTodos.length >= 5}
      />
      {inCompleteTodos.length >= 5 && (
        <p style={{ color: "red" }}>
          登録できるtodoは5個までだよ〜。消化しろ〜。
        </p>
      )}
      <IncompleteTodos
        todos={inCompleteTodos}
        onClickComplete={onClickComplete}
        onClickDelete={onClickDelete}
      />
      <CompleteTodos todos={completeTodos} onClickBack={onClickBack} />
    </>
  );
};
