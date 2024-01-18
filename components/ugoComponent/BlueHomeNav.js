import React from "react";

export default function BlueHomeNav() {
  return (
    <div style={{ backgroundColor: "#2A166D" }}>
      <ul class="nav justify-content-end gap-1 container">
        <li class="nav-item">
          <a
            class="nav-link text-white"
            aria-current="page"
            href="https://abiastatepolytechnic.edu.ng/">
            School Website
          </a>
        </li>

        <li class="nav-item">
          <a class="nav-link text-white" href="/login">
            Staff portal
          </a>
        </li>
      </ul>
    </div>
  );
}
