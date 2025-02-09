### App プラン
###
resource "azurerm_service_plan" "bca" {
  name                = "bugyo-cloud-agent"
  resource_group_name = azurerm_resource_group.bca.name
  location            = local.location
  os_type             = "Linux"
  sku_name            = "Y1"
}
