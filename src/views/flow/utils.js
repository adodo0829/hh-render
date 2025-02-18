function showPorts(ports, show) {
  for (let i = 0, len = ports.length; i < len; i += 1) {
    ports[i].style.visibility = show ? "visible" : "hidden";
  }
}

export default {
  showPorts,
};
