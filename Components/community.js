<Dropdown>
<DropdownTrigger>
  <Button variant="bordered">
    Open Menu
  </Button>
</DropdownTrigger>
<DropdownMenu aria-label="Static Actions">
  <LinkDropdownItem href="/profile">New file</LinkDropdownItem>
  <DropdownItem key="copy-link">Copy link</DropdownItem>
  <DropdownItem key="edit-file">Edit file</DropdownItem>
  <DropdownItem key="delete-file" className="text-danger" color="danger">
    Delete file
  </DropdownItem>
</DropdownMenu>
</Dropdown>