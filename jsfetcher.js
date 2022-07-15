function palindrome(str) {
  const arr = str.split('');
  const rra = str.split('');
  const revArr = rra.reverse();
  if (arr === revArr) {
    return true;
  }
  return false;
}
palindrome('eye');
palindrome('eyes');